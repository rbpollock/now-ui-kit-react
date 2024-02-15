import React, {useState} from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

import { useMagic } from "../../context/MagicProvider"
import { useUser, UserProvider } from "../../context/UserContext"

function IndexNavbar() {
  const [account, setAccount] = useState(null);
  const [idToken, setIdToken] = useState();

  const connectWallet = async () => {
    const accounts = await magic.wallet
      .connectWithUI()
      .on("id-token-created", (params) => {
        setIdToken(params.idToken);
      });

    setAccount(accounts[0]);
  };

  const showUI = () => {
    magic.wallet.showUI();
  };

  const logout = async () => {
    await magic.user.logout();
    setAccount(null);
  };

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  // Get the initializeWeb3 function from the Web3 context
  const { magic } = useMagic()
  const { fetchUser } = useUser()

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="/index"
              target="_blank"
              id="navbar-brand"
            >
              PageDAO
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Literature. Decentralized. Since 2021.
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("download-section")
                      .scrollIntoView();
                  }}
                >
                  <i className="now-ui-icons objects_spaceship"></i>
                  <p>Stats</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Tools</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/index" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    Tools
                  </DropdownItem>
                  <DropdownItem
                    href="/index"
                    tag={Link}
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    FAQ
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                  {!account && (
                    <Button
                    onClick={connectWallet}
                  >Log In</Button>
                  )}
                  {account && (
                      <Button
                      onClick={logout}
                    >Log Out</Button>
                    )}
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://twitter.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://medium.com/pagedao-magazine"
                  target="_blank"
                  id="medium-tooltip"
                >
                  <i className="fab fa-medium"></i>
                  <p className="d-lg-none d-xl-none">Medium</p>
                </NavLink>
                <UncontrolledTooltip target="#medium-tooltip">
                  Follow us on Medium
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://bit.ly/pagedao-discord"
                  target="_blank"
                  id="discord-tooltip"
                >
                  <i className="fab fa-discord"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#discord-tooltip">
                  Join our Discord
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
