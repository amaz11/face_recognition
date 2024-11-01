import AddTeacher from '../../Components/modal/teacher/AddTeacher/AddTeacher'
import { useParams } from 'react-router-dom'

const Teacher = () => {
    const { examId } = useParams()

    return (
        <div>
            <AddTeacher id={examId} />
        </div>
    )
}

export default Teacher