import { ProjectModel } from '../models/project.model.js';

// Obtener todos los proyectos
const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.getAllProjects();
        res.json({ ok: true, projects });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: "Error al obtener los proyectos",
            error: error.message 
        });
    }
};

// Obtener un proyecto por ID
const getProjectById = async (req, res) => {
    try {
        const { uid } = req.params;
        const project = await ProjectModel.findOneById(uid);
        
        if (!project) {
            return res.status(404).json({ 
                ok: false, 
                message: "Proyecto no encontrado" 
            });
        }

        res.json({ ok: true, project });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: "Error al obtener el proyecto",
            error: error.message 
        });
    }
};

// Crear un nuevo proyecto
const createProject = async (req, res) => {
    try {
        const { title, description, imgurl } = req.body;
        
        if (!title || !description || !imgurl) {
            return res.status(400).json({ 
                ok: false, 
                message: "Título, descripción e imagen son requeridos" 
            });
        }

        const newProject = await ProjectModel.createProject({ 
            title, 
            description, 
            imgurl 
        });

        res.status(201).json({ 
            ok: true, 
            message: "Proyecto creado exitosamente",
            project: newProject 
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: "Error al crear el proyecto",
            error: error.message 
        });
    }
};

// Actualizar un proyecto
const updateProject = async (req, res) => {
    try {
        const { uid } = req.params;
        const { title, description, imgurl } = req.body;

        const updatedProject = await ProjectModel.updateProject(uid, {
            title,
            description,
            imgurl
        });

        if (!updatedProject) {
            return res.status(404).json({ 
                ok: false, 
                message: "Proyecto no encontrado" 
            });
        }

        res.json({ 
            ok: true, 
            message: "Proyecto actualizado exitosamente",
            project: updatedProject 
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: "Error al actualizar el proyecto",
            error: error.message 
        });
    }
};

// Eliminar un proyecto
const deleteProject = async (req, res) => {
    try {
        const { uid } = req.params;
        const deletedProject = await ProjectModel.deleteProject(uid);

        if (!deletedProject) {
            return res.status(404).json({ 
                ok: false, 
                message: "Proyecto no encontrado" 
            });
        }

        res.json({ 
            ok: true, 
            message: "Proyecto eliminado exitosamente",
            project: deletedProject 
        });
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: "Error al eliminar el proyecto",
            error: error.message 
        });
    }
};

export const ProjectController = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};