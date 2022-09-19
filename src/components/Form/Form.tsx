import { useRef,useState } from 'react';
import {observer} from 'mobx-react-lite'
import mainStore from '../../store/mainStore';
import mainApi from '../../utils/Api';
import notificationStore from '../../store/notificationStore';

const  Form = observer (()=>{
  
  const link = useRef<any>();
  const [shortLink,setShortLink] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();
    squeezeLink(link.current.value);
  }

  function squeezeLink(link: string) {
    mainStore.setButtonDisableState(true);
    mainApi
      .getSqueeze(link, mainStore.token)
      .then((res: any) => {
        setShortLink(`http://79.143.31.216/s/${res.short}`);
        notificationStore.handlingNotification('Link has been squeezed');        
      })
      .catch((err) => {
        if (err === '422') {
          notificationStore.handlingNotification('Error:422. Link should be valid URL');
        } else {
          notificationStore.handlingNotification('Error: ' + err);
        }
      })
      .finally(() => {
        mainStore.setButtonDisableState(false);
      });}

  return (
    <form className="form__linkShortener">
      <h3 className="form__header">Please provide link which should be squeezed</h3>
      <div className="form__container">
        <input className="form__inputLink" ref={link} autoComplete="off" minLength={1} placeholder="Link" required />
        <p className="form__shortLink">{shortLink ? shortLink : 'Here will be short link'}</p>
        <button className="form__submitBtn" onClick={handleSubmit} disabled={mainStore.buttonDisableState}>
          Submit
        </button>
      </div>
    </form>
  );
}

) 

export default Form;
