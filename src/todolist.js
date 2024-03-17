import {useState} from 'react'
import './style.css'

function Todolist() {
    const [job, setJob] = useState('')
    const [jobs, setJobs] = useState(() => {
        const storageJobs = JSON.parse(localStorage.getItem('jobs'))
        return storageJobs ?? []
    })

    const handleSubmit = () => {
        setJobs(prev => {
            const newJobs = [...prev, job]

            //save job to local storage
            const jsonJobs = JSON.stringify(newJobs)
            localStorage.setItem('jobs', jsonJobs)
            return newJobs
        }
        )
        setJob('')
    }

    const handleDelete = (index) =>{
        setJobs(jobs.filter((_, i) => i !== index))
    }

    
// Trong JavaScript, khi bạn sử dụng filter để lọc một mảng, hàm callback của filter nhận vào hai đối số:

// Phần tử hiện tại: Đây là giá trị của phần tử mảng hiện tại đang được xem xét khi filter lặp qua từng phần tử.
// Chỉ mục (index): Đây là chỉ mục của phần tử hiện tại trong mảng.
// Trong một số trường hợp, bạn có thể không quan tâm đến giá trị của phần tử mà chỉ muốn sử dụng chỉ mục của nó trong hàm filter. Trong trường hợp đó, bạn có thể sử dụng dấu gạch dưới _ để biểu thị rằng bạn không quan tâm đến giá trị của phần tử, chỉ quan tâm đến chỉ mục.
// (_, i) biểu thị rằng chúng ta không cần sử dụng giá trị của phần tử (_ là biến không quan trọng, chỉ dùng để đại diện cho giá trị) mà chỉ quan trọng đến chỉ mục i.


    return (
        <div className='input'>
            <input
                value={job}
                onChange={ e => setJob(e.target.value)}
                className='myInput'
            />
            <button className='addBtn' onClick={handleSubmit}>add</button>
            <h2>Jobs:</h2>
            <ul>
                {jobs.map((job, index) => (
                <li key={index}>
                    {job}
                    <button onClick={() => handleDelete(index)}>delete</button>
                </li>
                ))}
            </ul>
        </div>
    )
    
}



export default Todolist;
