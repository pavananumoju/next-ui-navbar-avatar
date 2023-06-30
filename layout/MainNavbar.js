import { Navbar, Link, Text, Avatar, Dropdown, Spacer } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.js";
import { useAuth } from "@/context/auth-context.js";
import { useRouter } from "next/router.js";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

function MainNavbar() {
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const router = useRouter();

  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <Navbar isBordered variant="floating" css={{ zIndex: 1000 }}>
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <AcmeLogo />
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        variant="highlight-rounded"
      >
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Spacer x={0.5}/>
        <Switch
        shadow
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
        <Spacer x={0.5}/>
      </Navbar.Content>
      <div></div>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey) => {
              console.log({ actionKey });
              if (actionKey === "logout") {
                handleLogout();
              }
              if (actionKey === "login") {
                router.push("/login");
              }
              if (actionKey === "teams") {
                router.push("/teams");
              }
              if (actionKey === "rules") {
                router.push("/rules");
              }
            }}
          >
            {!user.uid ? (
              <Dropdown.Item
                key="login"
                css={{ height: "$18" }}
                aria-label="string"
              >
                <Link>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Login
                  </Text>
                </Link>
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                key="profile"
                css={{
                  height: "$18",
                  "pointer-events": "none",
                  cursor: "default",
                  "text-decoration": "none",
                }}
                aria-label="string"
              >
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user.email}
                </Text>
              </Dropdown.Item>
            )}

            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            {user.uid ? <Dropdown.Item key="teams">Teams</Dropdown.Item> : null}
            {user.uid ? <Dropdown.Item key="rules">Rules</Dropdown.Item> : null}
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            {user.uid ? (
              <Dropdown.Item
                key="logout"
                withDivider
                color="error"
                aria-label="string"
              >
                <a>Logout</a>
              </Dropdown.Item>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavbar;
