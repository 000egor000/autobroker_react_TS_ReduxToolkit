import React, { useEffect, useState } from 'react'

import { Modal } from 'rsuite'
import { Visible, Unvisible } from '@rsuite/icons'
import { autorizationAsync } from '../store/action-creators/infoAuto'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { ToastContainer, toast } from 'react-toastify'

interface AuthorizationProps {
  state: boolean
  dataChange: (val: boolean) => void
}

const Authorization: React.FC<AuthorizationProps> = ({ state, dataChange }) => {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const { error } = useAppSelector((state) => state.toolkitSliceData)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error === 'Что-то пошло не так c авторизацией!') toast.error(error)
  }, [error])

  const authorizationForm = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(autorizationAsync({ username, password }))
    close()
  }
  const close = () => {
    dataChange(false)
    setUsername('')
    setPassword('')
  }

  return (
    <div className="modal-container">
      <ToastContainer />
      <Modal
        backdrop={'static'}
        keyboard={false}
        open={state}
        onClose={() => close()}
      >
        <Modal.Header>
          <Modal.Title>
            <span style={{ fontSize: '24px', fontWeight: '700' }}>
              Авторизация
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="authorization">
            <form onSubmit={(e) => authorizationForm(e)}>
              <h3>Заполните данные для входа</h3>

              <input
                className=""
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Логин или email"
                required
              />
              <div style={{ position: 'relative' }}>
                <input
                  className=""
                  type={visible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  required
                />

                <button
                  onClick={() => setVisible(!visible)}
                  type="button"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '165px',
                    background: 'none',
                  }}
                >
                  {visible ? (
                    <Visible width="1.5em" height="1.5em" />
                  ) : (
                    <Unvisible width="1.5em" height="1.5em" />
                  )}
                </button>
              </div>

              <button type="submit" className="btn-auth">
                Войти
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}

export default Authorization
