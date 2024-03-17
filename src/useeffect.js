import {useState, useEffect, Fragment} from 'react'
import './style.css'


// 1.useEffect(callback)
//  - Gọi callback mỗi khi component re-render
//  - Khi nào thì gọi callback: Gọi callback sau khi component thêm element vào DOM
// 2.useEffect(callback,[])
//- Chỉ gọi callback 1 lần sau khi component mounted
// 3.useEffect(callback,[deps])
// - Call back sẽ được gọi lại mỗi khi deps thay đổi
//===============================
// 1.callback luôn được gọi sau khi component mount
// 2. Clean up function luôn được gọi trước khi component unmount

function Useeffect(){
    const [show, setShow] = useState (false)
    const [showapi, setShowapi] = useState (false)
    const [title, setTitle] = useState ('')
    const [api, setApi] = useState ([])
    const [type, setType] = useState ('posts')
    const [width, setWidth] = useState (window.innerWidth)
    const [showGoToTop, setShowGoToTop] = useState(false)
    const arrs = ['posts','comments','albums','photos','todos', 'users']
    useEffect(()=> {
        console.log('re-render');
    })

    useEffect(()=> {
        const handleScrollY = () =>{
            setShowGoToTop(window.scrollY >= 200) //window.scrollY >= 200 sẽ trả về giá trị boolean nếu window.scrollY >= 200 thì là true còn không thì false nếu true thì nút go to top hiện ra
        }

        const handleResize = () =>{
            setWidth(window.innerWidth)
        }
        window.addEventListener('scroll',handleScrollY)
        window.addEventListener('resize',handleResize)
        //cleanup function để remove EventListener đã add ở trên để tránh bị memmory leak
        return () =>{
            window.removeEventListener('resize',handleResize)
            window.removeEventListener('scroll',handleScrollY)
        }
    },[])

    useEffect(()=> {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then( api => (
                setApi(api)
            ))
    },[type])
    
    return(
        <div>
            <button onClick={()=> setShow(!show)}>
                toggle
            </button>
            {
            show && (
                <Fragment>
                    <input 
                        onChange={e => setTitle(e.target.value)}
                    />
                    <h2>{title}</h2>
                    <h2>{width}</h2>
                </Fragment>
            )
            }
            
            <button 
                style={{ display: 'block' }}
                onClick={()=> setShowapi(!showapi)}
            >
                show api
            </button>
            {showapi && 
                arrs.map((arr, index) => 
                    <button  
                        style={{ margin: '6px 8px 0 0' }} 
                        key={index}
                        onClick={()=> setType(arr)}
                    >
                        {arr}
                    </button>)
            }

            {showapi === false?(
               ''
            ):(
                <ul>
                    {api.map(item => <li key={item.id}>{item.title || item.body || item.name}</li>)}
                </ul>
            )}

            {showGoToTop&& (
                <button
                    style={{
                        position:'fixed',
                        right:'20px',
                        bottom:'20px'
                    }}
                >
                    go to top
                </button>
            )}

        </div>
    )
}

export default Useeffect