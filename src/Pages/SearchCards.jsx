import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import Icon from "../components/Icon";

export default function SearchCards() {
  return (
    <>
      <Layout className="md:flex-row justify-start gap-8 md:justify-evenly">
        <NavLink to="/search-plate">
          <Card title={"Vehículo"} subtitle={"Consultar por placa"}>
            <Icon name="icon-home" className="w-18 h-18 text-white" />
          </Card>
        </NavLink>
        <NavLink to="/instllationsRecords">
          <Card
            title={"Instalación"}
            subtitle={"Consultar por número de factura"}
          >
            <Icon name="icon-save" className="w-14 h-14 text-white" />
          </Card>
        </NavLink>
      </Layout>
    </>
  );
}
