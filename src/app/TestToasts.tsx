'use client'

import { ToastSuccess, ToastWarning, ToastError } from '@/components' // проверь путь к тостам

export const TestToasts = () => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button
        type={'button'}
        onClick={() =>
          ToastSuccess({
            title: 'Успех',
            message: 'Операция прошла успешно!',
          })
        }
      >
        Success
      </button>

      <button
        type={'button'}
        onClick={() =>
          ToastWarning({
            title: 'Внимание',
            message: 'Предупреждающее сообщение',
          })
        }
      >
        Warning
      </button>

      <button
        type={'button'}
        onClick={() =>
          ToastError({
            title: 'Ошибка формы',
            messages: [
              { type: 'required', message: 'Имя пользователя обязательно' },
              { type: 'minLength', message: 'Пароль слишком короткий' },
            ],
          })
        }
      >
        Error (Массив)
      </button>
    </div>
  )
}
