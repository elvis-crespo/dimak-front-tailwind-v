import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { LuFileSearch } from "react-icons/lu";
import { AnimatedContainer } from "../components/Animations";
import { MdOutlineContentPasteSearch } from "react-icons/md";

export default function SearchCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <AnimatedContainer>
          <div>
            <NavLink to="/search-plate">
              <Card title={"Vehículo"} subtitle={"Consultar por placa"}>
                <MdOutlineContentPasteSearch
                  style={{ fontSize: "4em", paddingBottom: "10px" }}
                />
              </Card>
            </NavLink>
          </div>
        </AnimatedContainer>

        <AnimatedContainer>
          <div>
            <NavLink to="/instllationsRecords">
              <Card
                title={"Instalación"}
                subtitle={"Consultar por número de factura"}
              >
                <LuFileSearch
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
