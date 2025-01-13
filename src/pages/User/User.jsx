import { useDispatch, useSelector } from "react-redux";
import NewHeader from '../../Components/NewHeader/NewHeader';
import styles from "./User.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../redux/authSlice";
import Modal from "react-responsive-modal";
import UpdateUserData from "../../Components/UpdatePopups/UpdateUserData";
import { userDataSelector } from "../../redux/selectors/selectors";

const User = () => {
  const [openUsernameModal, setOpenUsernameModal] = useState(false);

  const onOpenUsernameModal = () => setOpenUsernameModal(true);
  const onCloseUsernameModal = () => setOpenUsernameModal(false);
  const token=useSelector((state)=>state.user.token);
  // const userData=useSelector((state)=>state.user.data);  
  const userData=useSelector(userDataSelector);  
  const dispatch=useDispatch();

  useEffect(()=>{
      dispatch(getUserInfo(token));
  },[dispatch,token,userData?.length])

  return (
    <div className={styles.user}>
      <NewHeader active="user" />
      <section className={styles.userPage}>
        <div>
          <div className={styles.userCard}>
            <div className={styles.userData}>
              <span>{userData.username ? userData.username[0]:null}</span>
              <h3>{userData.username}</h3>
            </div>
            <div className={styles.userInputs}>
              <div className={styles.userInput}>
                <div>
                  <label>Name: </label>
                  <input value={userData.username || ""} type="text" readOnly />
                </div>
                <span>
                  <i className="fa-solid fa-pen" onClick={onOpenUsernameModal}></i>
                  <Modal open={openUsernameModal} onClose={onCloseUsernameModal} center 
                    classNames={{
                      modal: 'customModal',
                      overlayAnimationIn: 'customEnterOverlayAnimation',
                      overlayAnimationOut: 'customLeaveOverlayAnimation',
                      modalAnimationIn: 'customEnterModalAnimation',
                      modalAnimationOut: 'customLeaveModalAnimation',
                    }}>
                    <UpdateUserData type="username" name={userData.username} id={userData.id}/>
                  </Modal>
                </span>
              </div>
              <div className={styles.userInput}>
                <div>
                  <label>Email: </label>
                  <input value={userData.email || ""}  type="text" readOnly />
                </div>
                
              </div>
              <div className={styles.changePassword}>
                <p>Change Password</p>
                <div className={styles.arrowContainer}>
                  <Link to="/change-password">
                    <img src="/src/assets/images/next 5.png" alt="arrow"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link to="/losts">The Losts</Link>
          <Link to="/adds">The Adds</Link>
          <Link to="/matches">Found Losts</Link>
        </div>
      </section>
    </div>
  );
};

export default User;
