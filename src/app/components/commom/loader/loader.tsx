import './loader.css'
interface LoaderProps {
    show: Boolean
}
export default function Loader(props: LoaderProps) {
     if (!props.show) {
          return(<></>)  
        }
    return (
       
        <div id="loader" style={{
            
            width: '100%',
            height: '100%',
            zIndex: 99999,
            position: 'absolute',
            left: '20%',
            top: '30%'
        }}>
            <div style={{
                position: 'absolute',
                left: '20%',
                top: '30%'
            }}></div> 
        <div className="lds-roller">
            <div>
            </div><div>
            </div><div>
            </div><div>
            </div><div>
            </div><div>
            </div><div>
            </div><div>
            </div>
        </div>
        </div>
    )
}