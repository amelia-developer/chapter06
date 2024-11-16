import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"

function View() {    
    //  해당 글 번호에 해당하는 게시글 갖고오기
    const location = useLocation();
    let getBoardId = ''
    if(location.state !== null) {
        getBoardId = location.state.id
    } else {
        getBoardId = ''
    }
// console.log(`getBoardId = ${getBoardId}`);

    const [eachBoard, setEachBoard] = useState({}) // 아래 화면에 뿌려줄때, map으로 돌려주는것도 아니고 객체형태로 뿌려주니까 useState의 초기값을 빈객체로 설정하는게 맞음
    const [loading, setLoading] = useState(true) // 맨처음에 화면로딩할때 콘솔에서 eachBoard의 상태값이 빈객체로 나오는거(useState비동기적상태)를 로딩상태추가하여 로딩일때와 그렇지않을땐 컨텐츠보여주기

    useEffect(() => { // 화면에 가장 처음 렌더링 할때만 실행하면 된다고 생각해서 빈배열을 넣은 useEffect를 씀
        if(getBoardId) { // getBoardId이게 유효한 경우에만 실행
            axios.get(`http://localhost:3000/board/${getBoardId}`)
                .then(response => {
                    console.log(`response.data = ${JSON.stringify(response.data)}`);
                    setEachBoard(response.data)
                    setLoading(false) // 데이터갖고오고 상태변경
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false) // 데이터갖고오고 상태변경
                })
        }
    }, [getBoardId]) // 의존성배열에 id담은 이유는 첨 렌더링할때 한번만 설정되기때문에 일반적으론, 변경되지 않음

    const navigate = useNavigate()
    const onModify = (param) => {
        // console.log(`수정하려는 글번호 param = ${param}`);
        console.log(`수정페이지로 이동합니다`);
        navigate(`/modify/${param}`, {
            state:{
                id: param
            }
        })
    }

    const onListBoard = () => {
        navigate(`/`)
    }

// TODO:하는중_수정된게시글이 json에는 업데이트가 되는데, 화면에 안나옴(아래 로그찍으면 빈객체로 나오는데...) + eachBoard가 빈객체로 찍히는걸 방지하려고 로딩줬는데
// console.log(`게시글의 id확인 = ${getBoardId}`);
// console.log(`업데이트가 된 eachBoard = ${JSON.stringify(eachBoard)}`);
// console.log(`eachBoard = ${JSON.stringify(eachBoard)}`);
    if(loading) {
        return <div>화면 로딩중입니다. 잠시만 기다려주세요</div>
    }
    return (
        <>
            <div className="view-contents-box">
                <div className="top">
                    <span className="title">{eachBoard.title}</span>
                    <div className="inner">
                        <span className="author">{eachBoard.author}</span>
                        <span className="count">{eachBoard.count}</span>
                    </div>
                </div>
                <div className="middle">
                    <span className="contents">{eachBoard.contents}</span>
                </div>
                <div className="bottom">
                    <button onClick={onListBoard}>목록으로 가기</button>
                    <button onClick={() => onModify(eachBoard.id)}>수정하기</button>
                    <button>삭제하기</button>
                </div>
            </div>
        </>
    )
}

export default View