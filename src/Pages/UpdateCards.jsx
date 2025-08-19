import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { GrUpdate } from "react-icons/gr";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { AnimatedContainer } from "../components/Animations";

export default function UpdateCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <AnimatedContainer>
          <div>
            <NavLink to="/update-vehicle">
              <Card title={"Vehículo"} subtitle={"Actualizar datos del vehículo"}>
                <GrUpdate
                  style={{ fontSize: "4em", paddingBottom: "10px" }}
                />
              </Card>
            </NavLink>
          </div>
        </AnimatedContainer>

        <AnimatedContainer>
          <div>
            <NavLink to="/update-installation">
              <Card title={"Instalación"} subtitle={"Actualizar registro de instalación"}>
                <GrUpdate
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
