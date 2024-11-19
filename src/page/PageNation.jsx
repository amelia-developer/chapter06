import React from 'react'

function PageNation({onPageHandler, nowPage, totalPage}) {
    const onPageNumHandler = (param) => { // 부모에서 전달받은 props(함수형태)에다가 클릭핸들러함수의 파라미터를 props로 전달받은 콜백함수의 인자로 전달
        onPageHandler(param)        
    }  

    // 페이징그룹안에 있는 페이지를 5개씩 자름
    const pageGroupSize = 5;
    
    // 현재그룹에 대한 인덱스    
    const pageGroupIndex = Math.floor((nowPage-1) / pageGroupSize) // -1은 인덱스가 0부터 시작하니까(페이지는 1부터지만, 인덱스는 0부터 시작이니까)
console.log(`pageGroupIndex = ${pageGroupIndex}`);
   
    // 5개씩 쪼개진 페이징그룹에서 첫번째 숫자
    const groupStartNum = pageGroupSize * (pageGroupIndex + 1)+1
console.log(`groupStartNum = ${groupStartNum}`);

    // 5개씩 쪼개진 페이징그룹에서 마지막 숫자
    const groupLastNum = pageGroupSize * (pageGroupIndex % 5)+5
console.log(`groupLastNum = ${groupLastNum}`);
   

    const onPrevSection = () => {
    }

    const onPrevPage = () => {        
    }

    const onNextPage = () => {
    }

    return (
    <div className="paging-box">
        <ol>
            <li className="prev"><a href="#" target="_self">&lt;&lt;</a></li>
            <li className="prev"><a href="#" target="_self" onClick={onPrevPage}>&lt;</a></li>
            {                
                Array.from({length:totalPage}, (_, index) => {
                    const pageNum = index+1
                    // console.log(`pageNum = ${pageNum}`);
                    return <li key={index}><a href="#" target="_self" onClick={() => onPageNumHandler(pageNum)}>{pageNum}</a></li>
                    
                })               
            }
            <li className="next"><a href="#" target="_self" onClick={onNextPage}>&gt;</a></li>
            <li className="next"><a href="#" target="_self">&gt;&gt;</a></li>
        </ol>
    </div>
    )
}

export default PageNation
