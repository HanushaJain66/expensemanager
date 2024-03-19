import React,{useEffect,useState} from 'react'
import './RecordForm.css'
import sub from './img/submit.png'

function ExpenseForm({ userId,counter,result,setResult }) {
    const [catData, setCat] = useState([[]])
    const [acData, setAc] = useState([[]])
    const [formData, setFormData] = useState({
        user_id: String(userId),
        title: '',
        description: '',
        amount: '',
        account: '',
        counter: counter,
        category: '',
        sent_to:''
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    
    useEffect(() => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT CATEGORY_NAME,CATEGORY_ID FROM EXPENSE_CATEGORY"),
        })
            .then(response => response.json())
            .then(data => {
                setCat(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify("SELECT ACCOUNT_NAME,ACCOUNT_ID FROM DEFAULT_ACCOUNT WHERE USER_ID='" + userId + "'"),
        })
            .then(response => response.json())
            .then(data => {
                setAc(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        setFormData({ ...formData, ['counter']: counter });
    }, [counter])

    const handleSubmit = () => {
        if (formData.account == '' || formData.amount == '' || formData.title == '') {
            setResult('Enter proper data')
        } else {
            fetch('/expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    setResult(data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        formData.account = ''
        formData.amount = ''
        formData.title = ''
        formData.description = ''
        formData.category = ''
        formData.sent_to = ''
        setTimeout(() => {
            setResult('')
        }, 10000)
    }
    return (<>
        <div className='record-form'>
            <input required type='text' name='title' onChange={handleInputChange} className='form-field' placeholder='Enter Title' value={formData.title}></input>
            <input required type='text' name='amount' onChange={handleInputChange} className='form-field' placeholder='Amount' value={formData.amount}></input>
            <select required type='text' name='category' onChange={handleInputChange} className='form-field' value={formData.category}>
                <option className='option' value="">Select a Category</option>
                {catData.map((row) => {
                    return (<option key={row[1]} value={row[1]} className='option'>{row[0]}</option>)
                })}
            </select>
            <select required name='account' onChange={handleInputChange} className='form-field' value={formData.account}>
                <option className='option' value="">Select an Account</option>
                {acData.map((row) => {
                    return (<option key={row[1]} value={row[1]} className='option'>{row[0]}</option>)
                })}
            </select>
            <input type='text' name='description' onChange={handleInputChange} className='form-field' placeholder='Description' value={formData.description}></input>
            <input type='text' name='sent_to' onChange={handleInputChange} className='form-field' placeholder='Sent To' value={formData.sent_to}></input>
            <button className='record-btn' placeholder='Recieved From' value='Submit' onClick={handleSubmit} ><img width='40px' src={sub} /></button>
        </div>
        <div className='remark' style={{ color: (result == 'Enter proper data') ? 'red' : '#6cc9ff' }}>{result}</div></>
    )
}
export default ExpenseForm;