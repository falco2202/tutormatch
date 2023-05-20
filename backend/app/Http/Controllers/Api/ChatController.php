<?php

namespace App\Http\Controllers\Api;

use App\Events\AllMessageEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageCollection;
use App\Events\ConversationEvent;
use App\Events\MessageEvent;
use App\Http\Resources\ConversationCollection;
use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ChatController extends ApiController
{
    protected $conversation;
    protected $message;

    public function __construct(Conversation $conversation, Message $message)
    {
        $this->conversation = $conversation;
        $this->message = $message;
    }
    public function sendMessage(Request $request)
    {
        DB::beginTransaction();
        $user = auth()->user();
        $isAdmin = ($user->role == User::ROLES['ADMIN']);
        $data = ['content' => $request->get('message')];
        $channelName = $isAdmin ? $request->get('channel') : null;
        if (empty($channelName) && !$isAdmin) {
            $channelName = 'messages' . $user->id;
        }
        $conversation = $this->conversation->where('name', '=', $channelName)->first();

        // Check trường hợp admin gửi vào channel không tồn tại
        if (empty($conversation) && $isAdmin) {
            return $this->resNotFound(__('message.channel'));
        }
        try {
            if (empty($conversation)) {
                $conversation = $this->conversation->create(
                    ['name' => $channelName, 'user_id' => $user->id]
                );
            }
            if ($isAdmin) {
                $data['is_admin'] = true;
                $message = $conversation->messages()->create($data);
                broadcast(new MessageEvent($message, $channelName));
            } else {
                $message = $conversation->messages()->create($data);
                $conversation->update(['read_at' => null]);
                broadcast(new AllMessageEvent($message));
            }
            DB::commit();
            return $this->resSuccess(['channelName' => $channelName, 'message' => $message]);
        } catch (\Throwable $th) {
            DB::rollBack();
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }
    public function getListConversation(Request $request)
    {
        try {
            $user = auth()->user();
            $searchValue = $request->get('search_value');
            $conversation = $this->conversation->with('user.image');
            if (is_null($conversation)) {
                return $this->resNotFound(__('message.conversation'));
            }
            if (!empty($searchValue)) {
                $conversation = $conversation->whereHas('user', function ($query) use ($searchValue) {
                    $query->where('full_name', 'like', '%' . $searchValue . '%');
                });
            }
            if ($user->role == User::ROLES['ADMIN']) {
                return $this->resSuccess(ConversationResource::collection($conversation->get()));
            } elseif ($user->role == User::ROLES['TEACHER']) {
                return $this->resSuccess(
                    ConversationResource::collection($conversation->where('user_id', $user->id)->get())
                );
            } else {
                return $this->resUnauthorized();
            }
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }
    public function getListMessagesOfConversation(Request $request, $id)
    {
        try {
            $pageSize = $request->get('page_size');
            $conversation = $this->conversation->find($id);
            if (empty($conversation)) {
                return $this->resNotFound(trans('message.conversation'));
            }
            if (empty($conversation->read_at)) {
                $conversation->update(['read_at' => Carbon::now()]);
            }
            $messages = $conversation->messages()->orderBy('created_at', 'DESC');
            return $this->resSuccess(new MessageCollection($messages->paginate($pageSize)));
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }
}
