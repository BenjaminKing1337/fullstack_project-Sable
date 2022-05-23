import { useRouter } from "vue-router";
const Router = useRouter();
const goBack = () => {
  return Router.go(-1).then(Router.go());
};

export default goBack;
