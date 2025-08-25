import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import Icon from "../components/Icons/Icon";

export default function RegisterCards() {
  return (
    <>
      <Layout className="md:flex-row justify-start gap-8 md:justify-evenly">
        <NavLink to="/register-vehicle">
          <Card title="Vehículo" subtitle="Agregar registro de vehículo">
            <Icon name="icon-add-card" className="w-18 h-18 text-white" />
          </Card>
        </NavLink>
        <NavLink to="/register-installation">
          <Card title="Instalación" subtitle="Agregar registro de instalación"
          >
            <Icon name="icon-add-instalation-card" className="w-18 h-18 text-white"
            />
          </Card>
        </NavLink>
      </Layout>
    </>
  );
}
