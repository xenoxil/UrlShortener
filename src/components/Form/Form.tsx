

function Form(props:any){

    return(
    <form className='form__linkShortener'>
        <h3 className='form__header'>Please provide link which should be squeezed</h3>
        <div className='form__container'>
            <input className='form__inputLink' autoComplete="off" minLength={1} placeholder='Link' required/>
            <p className='form__shortLink'>{props.shortLinkText ? props.shortLinkText : 'Here will be short link'}</p>
            <button className="form__submitBtn">Submit</button>
        </div>
    </form>)
}

export default Form