"use strict";

const SingleFile = require("../models/singlefile");
const Multiplefile = require("../models/multiplefile");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require("path");


const singleFileUpload = async (req, res, next) => {
  try {
  
    const file ={
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormater(req.file.size, 2),
    };
    const singlefile = new SingleFile({
      title:req.body.title,
      file:file
    })
    await singlefile.save();

    res.status(201).json(singlefile);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const multipleFileUpload = async (req, res, next) => {
  try {
    let filesArray = [];
   

    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormater(element.size, 2),
      };
      filesArray.push(file);
    });
    const multiplefiles = new Multiplefile({
      // title: uuidv4(),
      title:req.body.title,
      files: filesArray,
    });

    await multiplefiles.save();
    res.status(201).json(multiplefiles);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallSingleFiles = async (req, res, next) => {
  try {
    const files = await SingleFile.find();
    // res.status(201).send(files);
    res.json(files)
  } catch (erorr) {
    res.status(400).send(erorr.message);
  }
};

const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await Multiplefile.find();
    res.status(201).send(files);
  } catch (erorr) {
    res.status(400).send(erorr.message);
  }
};

const deleteSingleFile = async(req,res,next)=>{
    try{
        const {fileName}= req.body
        const file =  await SingleFile.find()
       

        let filter = file.filter(item=> item.fileName === fileName)
        
        let filterpath = null
        filter.forEach(item=>  {
            filterpath = item.filePath
            
        })

        fs.unlink(filterpath,(err)=>{
            if(err){
                console.error(err)
                return
            }
        })
     

        await SingleFile.findOneAndDelete(filter)
        res.status(201).send(`Delete File ${filter.fileName} successfuly`)
        
        

    } catch (erorr) {
        res.status(400).send(erorr.message);
      }
}

const deleteMultipleFile = async(req,res,next)=>{
  try{
      const {title}= req.body
      const files =  await Multiplefile.find()
     
      let filter = files.filter(item=> item.title === title)
     

      
    
      let fileTitle = null
      filter.forEach(item=>  {
        fileTitle = item.title
          item.files.forEach(file=>{

            fs.unlink(file.filePath,(err)=>{
              if(err){
                console.error(err)
                return
              }
            })
          })
          
      })

     
   

      await Multiplefile.findOneAndDelete(filter)
      res.status(201).send(`Delete File ${fileTitle} successfuly`)
      
      

  } catch (erorr) {
      res.status(400).send(erorr.message);
    }
}


const updateMultipleFile =async(req,res,next)=>{
  try{
    const files =  await Multiplefile.findOne({title:req.body.title})

    
    let filesArray = []
    req.files.forEach(element=>{
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        // fileSize: fileSizeFormater(element.size, 2),
      };
      filesArray.push(file);
  
    })
    
   
    if(files){
      files.title=  req.body.title,
      files.files= filesArray

      const updateFiles =await files.save()
      res.status(201).json(updateFiles)
    }

  }catch (erorr) {
    res.status(400).send(erorr.message);
  }
}

const updateSingleFile =async(req,res,next)=>{
  try{
    const files =  await Multiplefile.findOne({title:req.body.title})

    
    let filesArray = []
    req.files.forEach(element=>{
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        // fileSize: fileSizeFormater(element.size, 2),
      };
      filesArray.push(file);
  
    })
    
   
    if(files){
      files.title=  req.body.title,
      files.files= filesArray

      const updateFiles =await files.save()
      res.status(201).json(updateFiles)
    }

  }catch (erorr) {
    res.status(400).send(erorr.message);
  }
}

const fileSizeFormater = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  deleteSingleFile,deleteMultipleFile,updateMultipleFile,updateSingleFile
};
