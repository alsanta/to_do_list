import React, { useState } from 'react';

const ToDo = (props) => {

    const [formInfo, setFormInfo] = useState({
        todo:"",
        checked:false
    })

    const changeHandler = (e) =>{
        setFormInfo({
            ...formInfo,[e.target.name]:e.target.value
        })
    }

    const [listToDo, setListToDo] = useState([])

    const addItem = (e) =>{
        e.preventDefault();
        setListToDo([...listToDo,formInfo]);
        setFormInfo({
            toDo:"",
            checked:false
        })
    }

    const complete = (idx) =>{
        const updatedList = listToDo.map((item,i) => { 
            if(idx === i){
                item.checked = !item.checked;
                // const updatedList = {...listToDo, checked: !item.checked};
                // return updatedList
            }
            return item
        })
        setListToDo(updatedList);
    }

    const deleteTask = (i)=>{
        let newListToDo = listToDo.filter((ninja,idx)=>{
            return idx !== i;
        })

        setListToDo(newListToDo);
    }

    return (
        <>
        <div>
            <form onSubmit={(e)=>addItem(e)}>
                <div className="form-group my-3">
                    <input name="toDo" onChange={(e) => changeHandler(e)} type="text" value={formInfo.toDo} />
                </div>
                <input className="btn btn-success" type="submit" value="Add" />
            </form>
            <hr />
            
            {listToDo.map((item,i)=>{
                const todoClasses =[];

                if (item.checked){
                    todoClasses.push("line")
                }


                return <div key={i} className="mb-3">
                        <p className={todoClasses.join(" ")} >{item.toDo}</p>
                        <input onChange={(e)=> complete(i)} checked={item.checked} className="me-2" type="checkbox" name="done" id="" />
                        <button onClick={(e)=>deleteTask(i)} className="btn btn-danger">Delete</button>
                    </div>
            })
            }
        </div>
        </>
    );
}

export default ToDo;