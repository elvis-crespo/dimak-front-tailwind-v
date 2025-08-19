import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { CgFolderAdd } from "react-icons/cg";
import { TiDocumentAdd } from "react-icons/ti";
import { AnimatedContainer } from "../components/Animations";

export default function RegisterCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <AnimatedContainer>
          <div>
            <NavLink to="/register-vehicle">
              <Card title={"Vehículo"} subtitle={"Agregar registro de vehículo"}>
                <CgFolderAdd
                  style={{ fontSize: "4em", paddingBottom: "10px" }}
                />
              </Card>
            </NavLink>
          </div>
        </AnimatedContainer>
        <AnimatedContainer>
          <div>
            <NavLink to="/register-installation">
              <Card title={"Instalación"} subtitle={"Agregar registro de instalación"}>
                <TiDocumentAdd
                  style={{ fontSize: "4em", paddingBottom: "10px" }}
                />
              </Card>
            </NavLink>
          </div>
        </AnimatedContainer>
      </ResponsiveContainerCard>
    </>
  );
}
