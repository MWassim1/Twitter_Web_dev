import '../../css/like.css';



function LikeButton(props){

    var btnvar1 = document.getElementById('btnlike');

    //Pour le changement de couleur 
   function Toggle1(){
            if (btnvar1.style.color ==="red") {
                btnvar1.style.color = "grey"
            }
            else{
                btnvar1.style.color = "red"
            }
   }

    return (

    <div className="btn_like">
        <button onClick={Toggle1} id="btnlike" className="btnlike"><i className="fas fa-heart"></i></button>
    </div>
    )
}


export default LikeButton