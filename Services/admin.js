const Admin = require('../Model/Schemas/Admin');

const createAdmin = async (firstName, lastName,email,password,privileges) => {

    const Admin = new Admin({Name:firstName,lastName:lastName,email:email,password:password,Privileges:privileges})


    return await Admin.save();
};

const getAdminById = async (id) => {
    return await Admin.findById(id);
};

const getAdmins = async (filter) => {
    return await Admin.find(filter);  // Return all Admins that satsify the filter (json format)
};

const updateAdminName = async (id, firstName,lastName) => {
   
    await Admin.findOneAndUpdate({_id:id},{Name:firstName,lastName:lastName});

};


const updateAdminMail = async (id, email) => {
   
    Admin.findOneAndUpdate({_id:id},{email:email});

};

const updateAdminPassword = async (id, newPass) => {
   
    Admin.findOneAndUpdate({_id:id},{password:newPass});

};

const updateAdminPrivileges = async (id, privileges) => {
   
    Admin.findOneAndUpdate({_id:id},{Privileges:privileges});

};

const deleteAdmin = async (id) => {
    
    Admin.deleteOne({_id:id})

}

const deleteAdminsByName = async(name) =>{
    await Admin.delete({Name:name});
}

const deleteAll = async() => {
  await Admin.deleteMany({})
}

const getCount = async() =>{
    return await Admin.count();
}


module.exports = {
    createAdmin,
    getAdminById,
    getAdmins,
    updateAdminName,
    updateAdminMail,
    updateAdminPassword,
    updateAdminPrivileges,
    deleteAdminsByName,
    deleteAdmin,
    getCount,
    deleteAll
}