<template>
  <q-page>
    <h1>NETLIFY</h1>
    <form id="toolsForm">
      <button type="submit" id="nextTool" class="btn text-dark">
        Get Next Tool
      </button>
    </form>
    <br /><br />
    <div class="card">
      <div id="content" class="card-body">Click the button!</div>
    </div>
  </q-page>
</template>

<script>
export default {
  setup() {
    /* const apiURL = "https://artofassassination.herokuapp.com";

    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const getTools = async () => {
      const res = await fetch(apiURL + "/api/tools");
      const tools = await res.json();
        
      const content = document.getElementById("content");

      let noOfTools = tools.length;

      let toolNo = getRandomArbitrary(0, noOfTools);

      content.innerHTML =
        "<div id='tool'> <img style='border: 1px solid black' height='200' src='" +
        tools[toolNo].img +
        "'><br><div id='text'><a style='font-size: 20px; color: black;' href='" +
        apiURL +
        tools[toolNo].uri +
        "' target='_blank'>" +
        tools[toolNo].name +
        "</a><br>" +
        tools[toolNo].description +
        "<br><br>" +
        tools[toolNo].type +
        "<br><br> <b>$ " +
        tools[toolNo].price +
        "</b></div></div>";
   
   return { res, tools, content, noOfTools, toolNo };
   };
    const toolsForm = document.getElementById("toolsForm");
    getTools();

    toolsForm.addEventListener("submit", (e) => {
      //preventing default
      e.preventDefault();

      getTools();
    });
  
  return { toolsForm }; */
  },
};
</script>

<style lang="scss" scoped>
</style>