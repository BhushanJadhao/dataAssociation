const multer=require("multer");
const{v4: uuidv4}=require ("uuid");
const path=require("path");//ha package use kelya jate for getting extension of any file
//console.log(path.extname("hell.pdf"));//o/p=>.pdf

const storage=multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"./public/images/uploads");
    },
    filename:function(req,file,cd){
        const uniqueFilename=uuidv4();
        cd(null,uniqueFilename + path.extname(file.originalname));
    }
});
const upload=multer({storage:storage});
module.exports=upload;
