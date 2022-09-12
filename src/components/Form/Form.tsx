import { useRef } from 'react';

function Form(props: any) {
  const link = useRef<any>();

  function handleSubmit(e: any) {
    e.preventDefault();
    props.squeeze(link.current.value);
  }

  return (
    <form className="form__linkShortener">
      <h3 className="form__header">Please provide link which should be squeezed</h3>
      <div className="form__container">
        <input className="form__inputLink" ref={link} autoComplete="off" minLength={1} placeholder="Link" required />
        <p className="form__shortLink">{props.shortLink !== '' ? props.shortLink : 'Here will be short link'}</p>
        <button className="form__submitBtn" onClick={handleSubmit} disabled={props.buttonDisableState}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
