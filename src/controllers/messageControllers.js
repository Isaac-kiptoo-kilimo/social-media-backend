import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"


export const createMessageController = async (req, res) => {
    try {

      const {SenderID,Content,Likes,Comments } = req.body;
      console.log(req.body);
// ,
// ,
// ReceiverID,
//     MessageDate, 
//     Content 
      const MessageID = v4();
      const { error } = createPostValidator({ Content });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const PostDate = new Date();    
        const createdPost = { UserID, PostID,Content,PostDate,Likes,Comments};
  
        const result = await createPostService(createdPost);
  
        if (result.message) {
          sendServerError(res, result.message)
      } else {
          sendCreated(res, 'post created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  export const updateMessageControllers = async (req, res) => {
    try {
      const { Content,Likes,Comments } = req.body;
      const { PostID } = req.params;

      const PostDate = new Date();    
      const { error } = updatePostValidator({Content });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedPost = await updatePostService({ Content,PostDate,Likes,Comments, PostID });
      console.log('Updated one',updatedPost);
      if (updatedPost.error) {
        return sendServerError(res, updatedPost.error);
      }
  
      return sendCreated(res, 'Post updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const updateContentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { PostID } = req.params;

      const { error } = updateContentValidator({ Content});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedContent = await updateContentService({ Content, PostID });
      console.log('Updated one',updatedContent);
  
      if (updatedContent.error) {
        return sendServerError(res, updatedContent.error);
      }
  
      return sendCreated(res, 'post updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleMessageController=async(req,res)=>{
    try {
      const {PostID}=req.params
      const singlePost=await getSinglePostServices(PostID)
      
      console.log('single',singlePost); 
      res.status(200).json({ post: singlePost });

    } catch (error) {
      return error
    }
  }



  export const getAllMessagesController = async (req, res) => {
    try {
      const results = await getAllPostsService()
        const posts=results.recordset
        console.log(posts);
      res.status(200).json({ Posts: posts });
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteMessageController=async(req,res)=>{
    try {
      const {PostID}=req.params
      const deletedPost=await deletePostServices(PostID)
      console.log('deleted post',deletedPost); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }
