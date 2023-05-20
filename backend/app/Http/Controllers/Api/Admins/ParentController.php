<?php

namespace App\Http\Controllers\Api\Admins;

use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ParentCollection;
use App\Http\Resources\ParentResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ParentController extends ApiController
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $pageSize = $request->get('page_size', config('constant.page_size'));
            $searchValue = $request->get('search_value');
            $parents = $this->user->where('role', User::ROLES['PARENT']);
            if (!empty($searchValue)) {
                $parents = $parents->searchByValue($searchValue);
            }
            $data = new ParentCollection($parents->paginate($pageSize));
            return $this->resSuccess($data);
        } catch (\Throwable $th) {
            logger($th->getMessage());
            return $this->resInternalError();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $parent = $this->user->find($id);
        if (is_null($parent)) {
            return $this->resNotFound(USER::PARENT_KEY);
        }
        $parentResource = new ParentResource($parent);
        return $this->resSuccess($parentResource);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        //
    }
}
