// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log("preevntttttt",likesCount,data);
                let like;
                if (data.data.deleted == true){
                    likesCount -= 1;
                    like=true;
                    
                }else{
                    likesCount += 1;
                    like =false;
                }
                // console.log("message--", data.data);
                console.log(self);
                if(data.data.type == "Post"){
                    // console.log("sucess-----------post", data.data.requestedTypeId);
                    let div1 = document.getElementById(`${data.data.requestedTypeId}`);
                    console.log(div1);
                    // $(self).attr('data-likes', likesCount);
                    div1.setAttribute("data-likes", `${likesCount}`);
                    div1.innerHTML = `${likesCount}`;
                    // console.log(div1);
               
                }else{
                         
                    console.log("sucess-----------");
                    $(self).attr('data-likes', likesCount);
                    $(self).html(`${likesCount} Likes`);
  
                }
           
                
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}