import {db} from '../config/connection.db.js';

const getAllProjects = async()=>{
    const query = {
        text: `SELECT * FROM projects`,
    }
    const {rows} = await db.query(query);
    return rows
};

const findOneById = async(uid) => {
    const query = {
        text: `
            SELECT * FROM projects
            WHERE uid = $1
        `,
        values: [uid]
    }
    const {rows} = await db.query(query);
    return rows[0]
};

const createProject = async({title, description, imgurl})=>{
    const query = {
        text: `
            INSERT INTO projects (title, description, imgurl)
            VALUES ($1, $2, $3)    
            RETURNING *
        `,
        values: [title, description, imgurl]
    }
    const {rows} = await db.query(query);
    return rows[0]
};


const updateProject = async(uid, {title, description, imgurl}) => {
    const query = {
        text: `
            UPDATE projects
            SET title = $1, 
                description = $2, 
                imgurl = $3
            WHERE uid = $4
            RETURNING *
        `,
        values: [title, description, imgurl, uid]
    }
    const {rows} = await db.query(query);
    return rows[0]
};

const deleteProject = async(uid) => {
    const query = {
        text: `
            DELETE FROM projects
            WHERE uid = $1
            RETURNING *
        `,
        values: [uid]
    }
    const {rows} = await db.query(query);
    return rows[0]
};

export const ProjectModel = {
    getAllProjects,
    findOneById,
    createProject,
    updateProject,
    deleteProject
};