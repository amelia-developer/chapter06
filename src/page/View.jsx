import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import Loading from './Loading';

function View() {    
    //  해당 글 번호에 해당하는 게시글 갖고오기
    const location = useLocation();
    // let getBoardId = ''
    // if(location.state !== null) {
    //     getBoardId = location.state.id
    // } else {
    //     getBoardId = ''
    // }
    const getBoardId = location.state?.id || '' // 위에 if문을 옵셔널체이닝을 써서 줄이기
// console.log(`getBoardId = ${getBoardId}`);    

console.log(`location.state.count = ${location.state.count}`);

    const [eachBoard, setEachBoard] = useState({}) // 아래 화면에 뿌려줄때, map으로 돌려주는것도 아니고 객체형태로 뿌려주니까 useState의 초기값을 빈객체로 설정하는게 맞음
    const [loading, setLoading] = useState(false) // 맨처음에 화면로딩할때 콘솔에서 eachBoard의 상태값이 빈객체로 나오는거(useState비동기적상태)를 로딩상태추가하여 로딩일때와 그렇지않을땐 컨텐츠보여주기

    useEffect(() => { // 화면에 가장 처음 렌더링 할때만 실행하면 된다고 생각해서 빈배열을 넣은 useEffect를 씀
        if(getBoardId) { // getBoardId이게 유효한 경우에만 실행
            setLoading(true) // 데이터를 갖고오기전에(=통신전에) 로딩화면 보여주기
            setTimeout(() => {
                axios.get(`http://localhost:3000/board/${getBoardId}`)
                .then(response => {
                    // console.log(`response.data = ${JSON.stringify(response.data)}`);
                    setEachBoard(response.data)
                    setLoading(false) // 데이터갖고오고 상태변경
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false) // 데이터갖고오고 상태변경
                })
            }, 2000) // 2초후에 통신으로 데이터불러오기
        }
    }, [getBoardId]) // 의존성배열에 id담은 이유는 첨 렌더링할때 한번만 설정되기때문에 일반적으론, 변경되지 않음 

    const navigate = useNavigate()
    const onModify = (param) => {
        // console.log(`수정하려는 글번호 param = ${param}`);
        console.log(`수정페이지로 이동합니다`);
        navigate(`/modify/${param}`, {
            state:{
                id: param,
                refresh1:false // modify에서 수정 후, view로 돌아왔을때 수정하여 업데이트 된 데이터를 화면에 보여줄때 구분짓기 위한 플래그
            }
        })
    }

    const onListBoard = () => {
        navigate(`/`)
    }

    const onDelete = (param) =>  {
        console.log(`삭제하려는 글의 id 즉,param은 = ${param}`);
        alert('해당글이 삭제됩니다')
        axios.delete(`http://localhost:3000/board/${param}`, {
            ...eachBoard,
            id:param
        })
        navigate(`/`)
    }

// console.log(`업데이트가 된 eachBoard = ${JSON.stringify(eachBoard)}`);
// console.log(`location.state1 = ${JSON.stringify(location.state)}`); // refresh가 true로 옴(modify에서 수정해서 view로 넘어오면 refresh는 true)
    if(loading) {
        return <Loading></Loading> 
    }
    return (
        <>
            <div className="view-contents-box">
                <div className="top">
                    <span className="title">{eachBoard.title}</span>
                    <div className="inner">
                        <span className="author">{eachBoard.author}</span>
                        <span className="count">{location.state.count}</span>
                    </div>
                </div>
                <div className="middle">
                    <span className="contents">{eachBoard.contents}</span>
                </div>
                <div className="bottom">
                    <button onClick={onListBoard}>목록으로 가기</button>
                    <button onClick={() => onModify(eachBoard.id)}>수정하기</button>
                    <button onClick={() => onDelete(eachBoard.id)}>삭제하기</button>
                </div>
            </div>
        </>
    )
}

export default View