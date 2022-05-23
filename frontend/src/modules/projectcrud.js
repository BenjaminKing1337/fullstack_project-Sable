import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseUrl from './baseUrl';

const GetProjects = () => {
  const Route = useRoute();
  const Router = useRouter();
  const ProjectId = computed(() => Route.params.id);

  const pState = ref({
    NewName: "",
    NewDescription: "",
    NewDeadline: "",
    NewColor: "#fd9f28",
    Projects: {},
  });

  const GetAllProjects = async () => {
    try {
      await fetch(baseUrl + "/projects")
        .then((Res) => Res.json())
        .then((Data) => {
          pState.value.Projects = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  
  const GetUserProjects = async () => {
    try {
      await fetch(baseUrl + "/projects/get/" + localStorage.getItem('userid'))
        .then((Res) => Res.json())
        .then((Data) => {
          pState.value.Projects = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const NewProject = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: localStorage.getItem('userid'),
        name: pState.value.NewName,
        description: pState.value.NewDescription,
        deadline: pState.value.NewDeadline,
        color: pState.value.NewColor,
      }),
    };
    fetch((baseUrl + "/projects/new"), RequestOptions).then(() => {
      GetUserProjects(); // Updates page
    });
  };

  const DeleteProject = (_id) => {
    fetch(baseUrl + "/projects/delete/" + _id, {
      method: "DELETE",
    }).then(() => {
      GetUserProjects(); // Updates page
    });
  };

  const EditProject = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pState.value.NewName,
        description: pState.value.NewDescription,
        deadline: pState.value.NewDeadline,
        color: pState.value.NewColor,
      }),
    };
    fetch(baseUrl + "/projects/update/" + ProjectId.value, RequestOptions)
      .then((Res) => Res.body)
    Router.push("/projects");
  };

  const Project = ref({});
  const GetSpecificProject = async () => {
    try {
      fetch(baseUrl + "/projects/")
        .then((Res) => Res.json())
        .then((Data) => {
          Project.value = Data.filter((L) => L._id === ProjectId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    Project,
    ProjectId,
    GetSpecificProject,
    pState,
    GetAllProjects,
    NewProject,
    DeleteProject,
    EditProject,
    GetUserProjects,
  };
};

export default GetProjects;
