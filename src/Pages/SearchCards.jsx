import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import Icon from "../components/Icons/Icon";

export default function SearchCards() {
  return (
    <>
      <Layout className="md:flex-row justify-start gap-8 md:justify-evenly">
        <NavLink to="/search-plate">
          <Card title={"Vehículo"} subtitle={"Consultar por placa"}>
            <Icon name="icon-search-card" className="w-18 h-18 text-white" />
          </Card>
        </NavLink>
        <NavLink to="/instllations-records">
          <Card
            title={"Instalación"}
            subtitle={"Consultar por número de factura"}
          >
            <Icon
              name="icon-search-all-form"
              className="w-16 h-16 text-white"
            />
          </Card>
        </NavLink>
      </Layout>
    </>
  );
}
