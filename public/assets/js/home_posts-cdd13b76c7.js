{let e=function(){let e=$("#new-post");e.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/users/create-posts",data:e.serialize(),success:function(e){console.log(e.data.name);let o=n(e.data.post);$("#post-list-container>ul").prepend(o),t($(" .delete-post",o))},error:function(e){console.log(e.responseText)}})}))},n=function(e){return $(` <li id="post-${e._id}">\n                    <p>\n                            ${e.post_content}\n                            \n                            <a class="delete-post" href="/users/delete-post/${e._id}">X</a>\n                          \n                            <br>\n                            <small>${e.userss.name}</small>\n                    </p>\n                    <div id="post-form">\n                            \n                                    <form action="/users/create-comment" method="POST" >\n                                            <input type="text" name="comment" placeholder="Add Comment">\n                                            <input type="hidden" name="post" value="${e._id}">\n                                            <input type="submit" value="Add Comment" id="button">\n                                    </form>\n                         \n                    </div>\n                    <div class="post-comments-list">\n                        <ul id="post-comments-${e._id}">\n                               \n                        </ul>\n                    </div>\n            </li>`)},t=function(e){console.log(e),$(e).click((function(n){n.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$("#post-"+e.data.post_id).remove()},error:function(e){console.log(e.responseText)}})}))};e()}