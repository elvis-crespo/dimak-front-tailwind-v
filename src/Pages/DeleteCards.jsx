import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import Icon from "../components/Icon";

export default function DeleteCards() {
  return (
    <>
      <Layout className="md:flex-row justify-start gap-8 md:justify-evenly">
        <NavLink to="/delete-vehicle">
          <Card title={"Vehículo"} subtitle={"Eliminar registro de vehículo"}>
            <Icon name="icon-home" className="w-18 h-18 text-white" />
          </Card>
        </NavLink>
        <NavLink to="/delete-installation">
          <Card
            title={"Instalación"}
            subtitle={"Eliminar registro de instalación"}
          >
            <Icon name="icon-save" className="w-14 h-14 text-white" />
          </Card>
        </NavLink>
      </Layout>
    </>
  );
}
