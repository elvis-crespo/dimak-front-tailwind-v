import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import Icon from "../components/Icon";

export default function UpdateCards() {
  return (
    <>
      <Layout className="md:flex-row justify-start gap-8 md:justify-evenly">
        <NavLink to="/update-vehicle">
          <Card title={"Vehículo"} subtitle={"Actualizar datos del vehículo"}>
            <Icon name="icon-home" className="w-18 h-18 text-white" />
          </Card>
        </NavLink>
        <NavLink to="/update-installation">
          <Card
            title={"Instalación"}
            subtitle={"Actualizar registro de instalación"}
          >
            <Icon name="icon-save" className="w-14 h-14 text-white" />
          </Card>
        </NavLink>
      </Layout>
    </>
  );
}
