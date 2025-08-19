import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { AnimatedContainer } from "../components/Animations";

export default function DeleteCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <AnimatedContainer>
          <div>
            <NavLink to="/delete-vehicle">
              <Card title={"Vehículo"} subtitle={"Eliminar registro de vehículo"}>
                <MdOutlineDeleteSweep
                  style={{ fontSize: "4em", paddingBottom: "10px" }}
                />
              </Card>
            </NavLink>
          </div>
        </AnimatedContainer>

        <AnimatedContainer>
          <div>
            <NavLink to="/delete-installation">
              <Card title={"Instalación"} subtitle={"Eliminar registro de instalación"}>
                <MdOutlineDeleteOutline
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
