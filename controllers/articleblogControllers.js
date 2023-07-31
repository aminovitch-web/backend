const articleblog = require("../models/articleblogModels");
const User = require("../models/userModels");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../utils/validateMongoDbId")

const createArticleBlog=asyncHandler(async( req,res) => {
try{
  const newArticleBlog = await articleblog.create(req.body);
  res.json({
    newArticleBlog,
  });
}catch(error){
    throw new Error(error);
}


});

const getAllArticleBlog=asyncHandler(async( req,res) => {



});

const updateArticleBlog = asyncHandler(async( req,res) => {


});

const deleteArticleBlog=asyncHandler(async( req,res) => {


});

const likeArticleBlog = asyncHandler(async( req,res ) => {



});

const dislikeArticleBlog = asyncHandler(async( req,res ) => {


});



module.exports= {
   createArticleBlog,
   updateArticleBlog,
   deleteArticleBlog,
   getAllArticleBlog,
}