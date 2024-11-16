import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import PageNation from './PageNation';
import axios from 'axios';

function Lists() {
    const navigate = useNavigate()

    const onNewWrite = () => {
        navigate("/insert") // Insert.jsx로 화면넘기기
    }

    const thArr = ['번호', '제목', '작성자', '조회수', '등록일', '수정일']

    const [contentsSorting, setContentsSorting] = useState([])
    
    // td에 들어갈 데이터 가져오기_useEffect로 의존성배열은 빈배열로 페이지 로드시, 한번만 불러옴
    useEffect(() => {
        axios.get("http://localhost:3000/board")
            .then(response => {
                // console.log(`response.data = ${JSON.stringify(response.data)}`);                
                setContentsSorting(response.data)
            })
    }, [])
    
    // 게시글 클릭하면 해당 게시글 뷰 페이지로 이동
    const onLinktoBoard = (param) => {
        // console.log(`param = ${JSON.stringify(param)}`);      
        navigate(`/view/${param}`, {
            state:{
                id: param,
                count: 0 // TODO:하는중
            }
        })
    }
    return (
        <>
            <h1>게시판</h1>
            <table>
                <colgroup>
                    <col width= "10%"/>
                    <col width= "40%"/>
                    <col width= "20%"/>
                    <col width= "10%"/>
                    <col width= "10%"/>
                    <col width= "10%"/>
                </colgroup>
                <thead>
                    <tr>
                        {
                            thArr.map((value, idx) => {
                                return <th key={idx}>{value}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        contentsSorting.map((value, idx) => {
                            return  <tr key={idx}>
                                        <td><a onClick={() => onLinktoBoard(value.id)}><span>{value.id}</span></a></td>
                                        <td><a onClick={() => onLinktoBoard(value.id)}><span>{value.title}</span></a></td>
                                        <td><a onClick={() => onLinktoBoard(value.id)}><span>{value.author}</span></a></td>
                                        <td><a onClick={() => onLinktoBoard(value.id)}><span>{value.count}</span></a></td>
                                        <td><a onClick={() => onLinktoBoard(value.id)}><span>{value.registerDate}</span></a></td>
                                        <td><a onClick={() => onLinktoBoard(value.id)}><span></span></a></td>
                                    </tr>
                        })
                        
                    }
                </tbody>
            </table>
            <div className="btn-box">
                <button onClick={onNewWrite}>새 글작성</button>
            </div>
            <PageNation></PageNation>
        </>
    )
}

export default Lists