import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Insert() {
    let today = new Date()
    // 날짜(년-월-일)
    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let dateString = year + '-' + month  + '-' + day
    // 시간(시:분:초)
    let hours = ('0' + today.getHours()).slice(-2)
    let minutes = ('0' + today.getMinutes()).slice(-2)
    let seconds = ('0' + today.getSeconds()).slice(-2) 
    let timeString = hours + ':' + minutes  + ':' + seconds

    let registerDate = dateString + '\u00A0' + timeString

    const [isInput, setIsInput] = useState({
        title:'',
        author:'',
        contents:''
    })
    const {title, author, contents} = isInput // 구조분해할당
    const onTitleInsert = (e) => {
        setIsInput({
            ...isInput, // isInput객체의 기존값을 복사해가지고 유지하면서, 새로입력한 값을 업데이트하려고
            title: e.target.value
        })
    }

    const onAuthorInsert = (e) => {
        setIsInput({
            ...isInput,
            author:e.target.value
        })
    }

    const onContentsInsert = (e) => {
        setIsInput({
            ...isInput,
            contents: e.target.value
        })
    }

    const navigate = useNavigate();

    const onRegister = async() => {
        try {
                const registerData = await axios.post("http://localhost:3000/board", {
                    title: title,
                    author: author,
                    contents: contents,
                    count: 0,
                    registerDate: registerDate
                })
                console.log(`등록되었습니다`);            
                navigate("/lists");
                return registerData
        } catch (error) {
                console.error(error);                        
        } 
    }

    const onCancle = () => {
        console.log(`글등록을 취소하였습니다, 이전페이지로 돌아갑니다`);
        navigate(-1);        
    }
    return (
        <div className="insert-contents-box">
            <div className="top">
                <span className="title"><input type="text" value={title} placeholder="제목" onChange={onTitleInsert}/></span>
                <span className="author"><input type="text" value={author} placeholder="작성자" onChange={onAuthorInsert}/></span>
            </div>
            <div className="middle">
                <span className="contents"><textarea placeholder="내용" value={contents} onChange={onContentsInsert}/></span>
            </div>
            <div className="bottom">
                <button onClick={onRegister}>등록하기</button>
                <button onClick={onCancle}>취소하기</button>
            </div>
        </div>
    )
}

export default Insert
