import Link from 'next/link'

export default function PageNotFound(){
    return(
        <section className='pageNotFound'>
        <h1 className="pageNotFound__header">
            404 - page not found
        </h1>
        <Link href="/" >
            <a className='pageNotFound__link'>
            Click to go back
            </a>
        </Link>
        </section>
    )
}