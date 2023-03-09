

const singleFileUpload =async(req,res,next)=>{
    try{
        const file= {
            fileName: req.file.orginalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            filesize: req.file.size
        }

        console.log(file)
        res.status(201).send('File Uploaded successfuly')
    }catch(error){
        res.status(400).send(error.message)

    }
}

module.exports ={
    singleFileUpload
}