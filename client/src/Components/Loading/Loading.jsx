import loading from './loading.module.css'

export default function Loading(){

    return (
    <div className={loading.loading}>
        <div className={loading.spinner}></div>
        <span className={loading.text}>LOADING...</span>
    </div>)
}