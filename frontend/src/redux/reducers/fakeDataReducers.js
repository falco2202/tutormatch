import { uniqueId } from '@/utils/helper'
import { createSlice } from '@reduxjs/toolkit'
import { filter, findIndex } from 'lodash'

//TODO_BETA
const initialState = {
  listQuestions: [
    {
      id: 1,
      key: 1,
      title: 'Chọn câu phát biểu đúng',
      time: 120,
      subject: 'Toán 7',
      answers: [
        {
          id: 1,
          answer: 'Hai đường thẳng cắt nhau tạo thành hai cặp góc đối đỉnh',
          isCorrect: true
        },
        {
          id: 2,
          answer: 'Ba đường thẳng cắt nhau tạo thành ba cặp góc đối đỉnh ',
          isCorrect: false
        },
        {
          id: 3,
          answer: 'Bốn  đường thẳng cắt nhau tạo thành bốn cặp góc đối đỉnh',
          isCorrect: false
        },
        {
          id: 4,
          answer: 'Cả A, B, C đều đúng',
          isCorrect: false
        }
      ]
    },
    {
      id: 2,
      key: 2,
      title:
        'Để đánh giá mức độ phù hợp của đề thi môn Toán 7, nhà trường có thể sử dụng cách nào để đảm bảo tính đại diện?',
      time: 120,
      subject: 'Toán 7',
      answers: [
        {
          id: 1,
          answer: 'Cho các bạn trong câu lạc bộ Toán học làm bài',
          isCorrect: false
        },
        {
          id: 2,
          answer: 'Cho các bạn học sinh giỏi làm bài',
          isCorrect: false
        },
        {
          id: 3,
          answer: 'Cho các bạn nữ làm bài',
          isCorrect: true
        },
        {
          id: 4,
          answer: 'Chọn 10 học sinh bất kì của các lớp làm bài',
          isCorrect: false
        }
      ]
    },
    {
      id: 3,
      key: 3,
      title:
        'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
      time: 180,
      subject: 'Toán 7',
      answers: [
        {
          id: 1,
          answer: '10%',
          isCorrect: false
        },
        {
          id: 2,
          answer: '30%',
          isCorrect: true
        },
        {
          id: 3,
          answer: '50%',
          isCorrect: false
        },
        {
          id: 4,
          answer: '70%',
          isCorrect: false
        }
      ]
    },
    {
      id: 4,
      key: 4,
      title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
      time: 180,
      subject: 'Toán 7',
      answers: [
        {
          id: 1,
          answer: '3,21',
          isCorrect: false
        },
        {
          id: 2,
          answer: '3,(12)',
          isCorrect: false
        },
        {
          id: 3,
          answer: '3,(21)',
          isCorrect: true
        },
        {
          id: 4,
          answer: '3,121212...',
          isCorrect: true
        }
      ]
    }
  ],
  listTests: [
    {
      id: 1,
      key: 1,
      title: 'Bài kiểm tra toán 15 phút',
      subject: 'Toán 7',
      description: 'Bài kiểm tra 15 phuits dành cho học sinh lớp 7',
      listQuestions: [
        {
          id: 2,
          key: 2,
          title:
            'Để đánh giá mức độ phù hợp của đề thi môn Toán 7, nhà trường có thể sử dụng cách nào để đảm bảo tính đại diện?',
          time: 120,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: 'Cho các bạn trong câu lạc bộ Toán học làm bài',
              isCorrect: false
            },
            {
              id: 2,
              answer: 'Cho các bạn học sinh giỏi làm bài',
              isCorrect: false
            },
            {
              id: 3,
              answer: 'Cho các bạn nữ làm bài',
              isCorrect: true
            },
            {
              id: 4,
              answer: 'Chọn 10 học sinh bất kì của các lớp làm bài',
              isCorrect: false
            }
          ]
        },
        {
          id: 3,
          key: 3,
          title:
            'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '10%',
              isCorrect: false
            },
            {
              id: 2,
              answer: '30%',
              isCorrect: true
            },
            {
              id: 3,
              answer: '50%',
              isCorrect: false
            },
            {
              id: 4,
              answer: '70%',
              isCorrect: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '3,21',
              isCorrect: false
            },
            {
              id: 2,
              answer: '3,(12)',
              isCorrect: false
            },
            {
              id: 3,
              answer: '3,(21)',
              isCorrect: true
            },
            {
              id: 4,
              answer: '3,121212...',
              isCorrect: true
            }
          ]
        }
      ]
    },
    {
      id: 2,
      key: 2,
      title: 'Bài kiểm tra 1 tiết',
      subject: 'Toán 7',
      description: 'Bài kiểm tra 1 tiết dành cho toán lớp 7',
      listQuestions: [
        {
          id: 1,
          key: 1,
          title: 'Chọn câu phát biểu đúng',
          time: 120,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: 'Hai đường thẳng cắt nhau tạo thành hai cặp góc đối đỉnh',
              isCorrect: true
            },
            {
              id: 2,
              answer: 'Ba đường thẳng cắt nhau tạo thành ba cặp góc đối đỉnh ',
              isCorrect: false
            },
            {
              id: 3,
              answer: 'Bốn đường thẳng cắt nhau tạo thành bốn cặp góc đối đỉnh',
              isCorrect: false
            },
            {
              id: 4,
              answer: 'Cả A, B, C đều đúng',
              isCorrect: false
            }
          ]
        },
        {
          id: 2,
          key: 2,
          title:
            'Để đánh giá mức độ phù hợp của đề thi môn Toán 7, nhà trường có thể sử dụng cách nào để đảm bảo tính đại diện?',
          time: 120,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: 'Cho các bạn trong câu lạc bộ Toán học làm bài',
              isCorrect: false
            },
            {
              id: 2,
              answer: 'Cho các bạn học sinh giỏi làm bài',
              isCorrect: false
            },
            {
              id: 3,
              answer: 'Cho các bạn nữ làm bài',
              isCorrect: true
            },
            {
              id: 4,
              answer: 'Chọn 10 học sinh bất kì của các lớp làm bài',
              isCorrect: false
            }
          ]
        },
        {
          id: 3,
          key: 3,
          title:
            'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '10%',
              isCorrect: false
            },
            {
              id: 2,
              answer: '30%',
              isCorrect: true
            },
            {
              id: 3,
              answer: '50%',
              isCorrect: false
            },
            {
              id: 4,
              answer: '70%',
              isCorrect: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '3,21',
              isCorrect: false
            },
            {
              id: 2,
              answer: '3,(12)',
              isCorrect: false
            },
            {
              id: 3,
              answer: '3,(21)',
              isCorrect: true
            },
            {
              id: 4,
              answer: '3,121212...',
              isCorrect: true
            }
          ]
        }
      ]
    }
  ],
  listHomeworks: [
    {
      id: 1,
      key: 1,
      title: 'Bài kiểm tra toán 15 phút',
      subject: 'Toán 7',
      description: 'Bài kiểm tra 15 phuits dành cho học sinh lớp 7',
      timeEnd: '2023/05/09 09:00',
      timeStart: '2023/05/10 12:00',
      point: '90/100',
      status: true,
      listQuestions: [
        {
          id: 2,
          key: 2,
          title: 'Hai tia phân giác của hai góc đối dỉnh là',
          time: 120,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: 'Hai tia trùng nhau  ',
              isCorrect: false
            },
            {
              id: 2,
              answer: 'Hai tia vuông góc  ',
              isCorrect: false
            },
            {
              id: 3,
              answer: 'Hai tia đối nhau ',
              isCorrect: true
            },
            {
              id: 4,
              answer: 'Hai tia song song',
              isCorrect: false
            }
          ]
        },
        {
          id: 3,
          key: 3,
          title:
            'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '10%',
              isCorrect: false
            },
            {
              id: 2,
              answer: '30%',
              isCorrect: true
            },
            {
              id: 3,
              answer: '50%',
              isCorrect: false
            },
            {
              id: 4,
              answer: '70%',
              isCorrect: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '3,21',
              isCorrect: false
            },
            {
              id: 2,
              answer: '3,(12)',
              isCorrect: false
            },
            {
              id: 3,
              answer: '3,(21)',
              isCorrect: true
            },
            {
              id: 4,
              answer: '3,121212...',
              isCorrect: true
            }
          ]
        }
      ]
    },
    {
      id: 2,
      key: 2,
      title: 'Bài kiểm tra 1 tiết',
      subject: 'Toán 7',
      description: 'Bài kiểm tra 1 tiết dành cho toán lớp 7',
      timeEnd: '2023/07/10 12:00',
      timeStart: '2023/05/10 09:00',
      point: '80/100',
      status: false,
      listQuestions: [
        {
          id: 1,
          key: 1,
          title: 'Chọn câu phát biểu đúng',
          time: 120,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: 'Hai đường thẳng cắt nhau tạo thành hai cặp góc đối đỉnh',
              isCorrect: true
            },
            {
              id: 2,
              answer: 'Ba đường thẳng cắt nhau tạo thành ba cặp góc đối đỉnh ',
              isCorrect: false
            },
            {
              id: 3,
              answer: 'Bốn đường thẳng cắt nhau tạo thành bốn cặp góc đối đỉnh',
              isCorrect: false
            },
            {
              id: 4,
              answer: 'Cả A, B, C đều đúng',
              isCorrect: false
            }
          ]
        },
        {
          id: 2,
          key: 2,
          title:
            'Để đánh giá mức độ phù hợp của đề thi môn Toán 7, nhà trường có thể sử dụng cách nào để đảm bảo tính đại diện?',
          time: 120,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: 'Cho các bạn trong câu lạc bộ Toán học làm bài',
              isCorrect: false
            },
            {
              id: 2,
              answer: 'Cho các bạn học sinh giỏi làm bài',
              isCorrect: false
            },
            {
              id: 3,
              answer: 'Cho các bạn nữ làm bài',
              isCorrect: true
            },
            {
              id: 4,
              answer: 'Chọn 10 học sinh bất kì của các lớp làm bài',
              isCorrect: false
            }
          ]
        },
        {
          id: 3,
          key: 3,
          title:
            'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '10%',
              isCorrect: false
            },
            {
              id: 2,
              answer: '30%',
              isCorrect: true
            },
            {
              id: 3,
              answer: '50%',
              isCorrect: false
            },
            {
              id: 4,
              answer: '70%',
              isCorrect: false
            }
          ]
        },
        {
          id: 4,
          key: 4,
          title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '3,21',
              isCorrect: false
            },
            {
              id: 2,
              answer: '3,(12)',
              isCorrect: false
            },
            {
              id: 3,
              answer: '3,(21)',
              isCorrect: true
            },
            {
              id: 4,
              answer: '3,121212...',
              isCorrect: true
            }
          ]
        }
      ]
    },
    {
      id: 3,
      key: 3,
      title: 'Bài kiểm tra toán 30 phút',
      subject: 'Toán 7',
      description: 'Bài kiểm tra 15 phuits dành cho học sinh lớp 7',
      timeEnd: '2023/07/11 09:00',
      timeStart: '2023/07/10 12:00',
      point: '70/100',
      status: false,
      listQuestions: [
        {
          id: 2,
          key: 2,
          title: 'Hai tia phân giác của hai góc đối dỉnh là',
          time: 120,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: 'Hai tia trùng nhau  ',
              isCorrect: false
            },
            {
              id: 2,
              answer: 'Hai tia vuông góc  ',
              isCorrect: false
            },
            {
              id: 3,
              answer: 'Hai tia đối nhau ',
              isCorrect: true
            },
            {
              id: 4,
              answer: 'Hai tia song song',
              isCorrect: false
            }
          ]
        },
        {
          id: 3,
          key: 3,
          title:
            'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
          time: 180,
          subject: 'Toán 7',
          answers: [
            {
              id: 1,
              answer: '10%',
              isCorrect: false
            },
            {
              id: 2,
              answer: '30%',
              isCorrect: true
            },
            {
              id: 3,
              answer: '50%',
              isCorrect: false
            },
            {
              id: 4,
              answer: '70%',
              isCorrect: false
            }
          ]
        }
      ]
    }
  ],
  dataResultClass: {
    id: 1,
    key: 1,
    title: 'Bài kiểm tra toán 15 phút',
    subject: 'Toán 7',
    description: 'Bài kiểm tra 15 phuits dành cho học sinh lớp 7',
    students: [
      {
        id: 1,
        key: 1,
        fullName: 'Nguyễn Tấn Tài, ',
        score: 50,
        result: [
          {
            id: 2,
            key: 2,
            title: 'Hai tia phân giác của hai góc đối dỉnh là',
            time: 120,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: 'Hai tia trùng nhau  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: 'Hai tia vuông góc  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: 'Hai tia đối nhau ',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: 'Hai tia song song',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 3,
            key: 3,
            title:
              'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '10%',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '30%',
                isCorrect: true,
                isChoice: false
              },
              {
                id: 3,
                answer: '50%',
                isCorrect: false,
                isChoice: true
              },
              {
                id: 4,
                answer: '70%',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 4,
            key: 4,
            title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '3,21',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '3,(12)',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: '3,(21)',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: '3,121212...',
                isCorrect: true,
                isChoice: false
              }
            ]
          }
        ]
      },
      {
        id: 2,
        key: 2,
        fullName: 'Trần Quốc Tuấn',
        score: 100,
        result: [
          {
            id: 2,
            key: 2,
            title: 'Hai tia phân giác của hai góc đối dỉnh là',
            time: 120,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: 'Hai tia trùng nhau  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: 'Hai tia vuông góc  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: 'Hai tia đối nhau ',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: 'Hai tia song song',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 3,
            key: 3,
            title:
              'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '10%',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '30%',
                isCorrect: true,
                isChoice: false
              },
              {
                id: 3,
                answer: '50%',
                isCorrect: false,
                isChoice: true
              },
              {
                id: 4,
                answer: '70%',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 4,
            key: 4,
            title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '3,21',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '3,(12)',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: '3,(21)',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: '3,121212...',
                isCorrect: true,
                isChoice: false
              }
            ]
          }
        ]
      },
      {
        id: 3,
        key: 3,
        fullName: 'Nguyễn Thiện Giao',
        score: 0,
        result: [
          {
            id: 2,
            key: 2,
            title: 'Hai tia phân giác của hai góc đối dỉnh là',
            time: 120,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: 'Hai tia trùng nhau  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: 'Hai tia vuông góc  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: 'Hai tia đối nhau ',
                isCorrect: true,
                isChoice: false
              },
              {
                id: 4,
                answer: 'Hai tia song song',
                isCorrect: false,
                isChoice: true
              }
            ]
          },
          {
            id: 3,
            key: 3,
            title:
              'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '10%',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '30%',
                isCorrect: true,
                isChoice: false
              },
              {
                id: 3,
                answer: '50%',
                isCorrect: false,
                isChoice: true
              },
              {
                id: 4,
                answer: '70%',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 4,
            key: 4,
            title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '3,21',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '3,(12)',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: '3,(21)',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: '3,121212...',
                isCorrect: true,
                isChoice: false
              }
            ]
          }
        ]
      },
      {
        id: 4,
        key: 4,
        fullName: 'Hoàng Ngọc Long',
        score: 50,
        result: [
          {
            id: 2,
            key: 2,
            title: 'Hai tia phân giác của hai góc đối dỉnh là',
            time: 120,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: 'Hai tia trùng nhau  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: 'Hai tia vuông góc  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: 'Hai tia đối nhau ',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: 'Hai tia song song',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 3,
            key: 3,
            title:
              'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '10%',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '30%',
                isCorrect: true,
                isChoice: false
              },
              {
                id: 3,
                answer: '50%',
                isCorrect: false,
                isChoice: true
              },
              {
                id: 4,
                answer: '70%',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 4,
            key: 4,
            title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '3,21',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '3,(12)',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: '3,(21)',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: '3,121212...',
                isCorrect: true,
                isChoice: false
              }
            ]
          }
        ]
      },
      {
        id: 5,
        key: 5,
        fullName: 'Trần Văn Duy',
        score: 0,
        result: [
          {
            id: 2,
            key: 2,
            title: 'Hai tia phân giác của hai góc đối dỉnh là',
            time: 120,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: 'Hai tia trùng nhau  ',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: 'Hai tia vuông góc',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: 'Hai tia đối nhau ',
                isCorrect: true,
                isChoice: false
              },
              {
                id: 4,
                answer: 'Hai tia song song',
                isCorrect: false,
                isChoice: true
              }
            ]
          },
          {
            id: 3,
            key: 3,
            title:
              'Cho hình tròn biểu diễn dữ liệu đã được chia sẵn thành 10 hình quạt bằng nhau. 3 hình quạt ứng với bao nhiêu phần trăm?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '10%',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '30%',
                isCorrect: true,
                isChoice: false
              },
              {
                id: 3,
                answer: '50%',
                isCorrect: false,
                isChoice: true
              },
              {
                id: 4,
                answer: '70%',
                isCorrect: false,
                isChoice: false
              }
            ]
          },
          {
            id: 4,
            key: 4,
            title: 'Hãy viết gọn số thập phân vô hạn tuần hoàn 3,2121212…?',
            time: 180,
            subject: 'Toán 7',
            answers: [
              {
                id: 1,
                answer: '3,21',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 2,
                answer: '3,(12)',
                isCorrect: false,
                isChoice: false
              },
              {
                id: 3,
                answer: '3,(21)',
                isCorrect: true,
                isChoice: true
              },
              {
                id: 4,
                answer: '3,121212...',
                isCorrect: true,
                isChoice: false
              }
            ]
          }
        ]
      }
    ]
  },
  listExercises: [
    {
      id: 1,
      key: 1,
      title: 'Tài liệu ôn tập Toán lớp 7',
      description: 'Bài tập ôn thi học kì 1',
      attachment: [
        {
          id: 1,
          file: 'luyen_tap_toan_7.docx'
        }
      ]
    },
    {
      id: 2,
      key: 2,
      title: 'Bộ đề Toán lớp 7 năm 2022-2023',
      description: 'Bài tập ôn thi học kì 2',
      attachment: [
        {
          id: 1,
          file: '10_de_toan_7_2022_2023_co_dap_an.pdf'
        },
        {
          id: 2,
          file: 'toan_7_nang_cao_1.docx'
        }
      ]
    },
    {
      id: 3,
      key: 3,
      title: 'Bộ đề ôn tập Văn lớp 9',
      description: 'Luyện thi vào lớp 10',
      attachment: [
        {
          id: 1,
          file: 'de_van_lop_9_2022_2023_co_dap_an.pdf'
        },
        {
          id: 2,
          file: 'van_9_nang_cao_1.docx'
        }
      ]
    },
    {
      id: 4,
      key: 4,
      title: 'Tài liệu ôn tập Tiếng anh lớp 10',
      description: 'Bài tập ôn thi học kì 2',
      attachment: [
        {
          id: 1,
          file: 'english_10.doc'
        }
      ]
    },
    {
      id: 5,
      key: 5,
      title: '300 bài code thiếu nhi',
      description: 'Ôn luyện thuật toán thiếu nhi',
      attachment: [
        {
          id: 1,
          file: '300_bai_code_thieu_nhi_co_dap_an.pdf'
        }
      ]
    }
  ],
  listExercisesShared: [
    {
      id: 1,
      key: 1,
      title: 'Tài liệu ôn tập thi học kì 1',
      description: 'Bộ đề ôn thi học kì 1',
      attachment: [
        {
          id: 1,
          file: 'tai_lieu_on_tap_hk1.pdf'
        }
      ]
    }
  ]
}

const fakeDataSlice = createSlice({
  name: 'fakeDataSlice',
  initialState,
  reducers: {
    deleteQuestion: (state, { payload }) => {
      state.listQuestions = filter(
        state.listQuestions,
        function (currentObject) {
          return currentObject.id !== payload
        }
      )
    },
    addQuestion: (state, { payload }) => {
      const id = uniqueId()
      const newQuestion = { ...payload, id, key: id }
      state.listQuestions.push(newQuestion)
    },
    editQuestion: (state, { payload }) => {
      const index = findIndex(state.listQuestions, { id: payload.id })

      state.listQuestions.splice(index, 1, payload)
    },
    deleteTest: (state, { payload }) => {
      state.listTests = filter(state.listTests, function (currentObject) {
        return currentObject.id !== payload
      })
    },
    addTest: (state, { payload }) => {
      const id = uniqueId()
      const newTest = { ...payload, id, key: id }
      state.listTests.push(newTest)
    },
    editTest: (state, { payload }) => {
      const index = findIndex(state.listTests, { id: payload.id })

      state.listTests.splice(index, 1, payload)
    },
    addHomework: (state, { payload }) => {
      const id = uniqueId()
      const newQuestion = { ...payload, id, key: id }
      state.listHomeworks.push(newQuestion)
    },
    changeStatus: (state, { payload }) => {
      const listHomeworksChange = state.listHomeworks.map((item) => {
        if (item.id === payload) {
          return { ...item, status: true }
        }
        return item
      })

      state.listHomeworks = listHomeworksChange
    },
    addExercise: (state, { payload }) => {
      const id = uniqueId()
      const newExercise = { ...payload, id, key: id }
      state.listExercises.push(newExercise)
    },
    addExerciseShared: (state, { payload }) => {
      const id = uniqueId()
      const newExercise = { ...payload, id, key: id }
      state.listExercisesShared.push(newExercise)
    }
  }
})

export const {
  addExerciseShared,
  deleteQuestion,
  testFunction,
  addQuestion,
  editQuestion,
  deleteTest,
  addTest,
  editTest,
  addHomework,
  changeStatus,
  addExercise
} = fakeDataSlice.actions
export default fakeDataSlice.reducer
