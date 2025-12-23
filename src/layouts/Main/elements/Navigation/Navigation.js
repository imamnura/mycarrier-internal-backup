import ArrowDown from '@assets/icon-v2/ArrowDown';
import Cancel from '@assets/icon-v2/Cancel';
import Menu from '@assets/icon-v2/Menu';
import IconXXX from '@assets/icon-v2/PurchaseOrder';
import Button from '@components/Button';
import SearchBox from '@components/SearchBox';
import Typography from '@components/Typography/Typography';
import { menuList } from '@configs/navigation';
import { Sidebar, Text } from '@legion-ui/core';
import { Drawer } from '@material-ui/core';
import color from '@styles/color';
import useResponsive from '@utils/hooks/useResponsive';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useNavigationStyles from './Navigation.styles';
import { getUserData } from '@utils/common';
import { maskLocatorLabel } from '@utils/test-locator';

const Navigation = (props) => {
  const router = useRouter();
  const { expand, setExpand, hideNavigation } = props;

  const { privileges } = getUserData();

  let smClient = useResponsive('sm');
  if (hideNavigation) smClient = true;

  const classes = useNavigationStyles({ expand, smClient });

  const [openedMenu, setOpenedMenu] = useState([]);

  const location = router.asPath;
  const pathname = router.pathname;

  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
  }, [location]);

  const drawer = menuList();

  const drawerMenu = useMemo(() => {
    if (!search) {
      return drawer;
    }

    return drawer
      .map((c) => ({
        ...c,
        menu: c.menu.filter(({ menuLabel }) =>
          menuLabel.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      }))
      .filter(({ menu }) => !!menu.length);
  }, [search, JSON.stringify(drawer)]);

  useEffect(() => {
    let allMenu = [];

    drawerMenu.forEach(({ menu, categoryName }) => {
      menu.forEach((m) => {
        allMenu.push({ categoryName, ...m });
      });
    });

    const categoryActive = allMenu.filter((a) => {
      if (search) {
        return a.menuLabel
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      } else {
        return pathname.includes(a.path) || pathname.includes(a.pathDetail);
      }
    });

    setOpenedMenu(categoryActive.map(({ categoryName }) => categoryName));
  }, [JSON.stringify(drawerMenu), search]);

  const renderNav = (
    <div className={classes.root}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: color.white,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '56px',
          }}
        >
          {expand && (
            <Text weight="700" color="secondary-400" ml="24px">
              INTERNAL
            </Text>
          )}
          {!smClient && (
            <div
              style={{
                width: expand ? '64px' : '72px',
                height: '56px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Menu className={classes.menuIcon} onClick={setExpand} />
            </div>
          )}
        </div>
        {expand && (
          <div
            style={{
              padding: '0px 24px 16px 24px',
            }}
          >
            <SearchBox
              placeholder="Search menu"
              onChange={setSearch}
              value={search}
            />
          </div>
        )}
      </div>

      {!expand ? (
        <Sidebar
          style={{
            boxShadow: '0px 4px 10px 0px rgba(46, 67, 77, 0.08)',
            height: '100%',
            paddingTop: 0,
            background: 'white',
          }}
          collapse
          items={drawerMenu.map(
            ({ categoryLabel, categoryName, menu, Icon = IconXXX }) => {
              const categoryActive = !!menu.filter(
                ({ pathDetail, path }) =>
                  location.includes(path) || location.includes(pathDetail),
              ).length;

              return {
                childrens: menu.map(
                  ({ menuLabel, menuName, pathDetail, path }) => {
                    const active =
                      location.includes(path) || location.includes(pathDetail);
                    return {
                      title: (
                        <Link
                          id={`menu-${maskLocatorLabel(menuName)}`}
                          href={path}
                        >
                          {menuLabel}
                        </Link>
                      ),
                      active: active,
                    };
                  },
                ),
                iconTitle: <Icon className={classes.menuIcon} />,
                title: categoryLabel,
                active: categoryActive,
                id: `category-menu-${maskLocatorLabel(categoryName)}`,
              };
            },
          )}
        />
      ) : (
        <div
          style={{
            flexGrow: 1,
            overflow: 'auto',
            paddingBottom: '24px',
            // maxHeight: '70%',
          }}
        >
          {drawerMenu.map(
            ({ categoryLabel, categoryName, menu, Icon = IconXXX }, i) => {
              const categoryActive = !!menu.filter(
                ({ pathDetail, path }) =>
                  location.includes(path) || location.includes(pathDetail),
              ).length;

              const isExpand = openedMenu.includes(categoryName);

              return (
                <div key={i}>
                  <div
                    className={classes.mainMenu}
                    id={`category-menu-${maskLocatorLabel(categoryName)}`}
                    onClick={() =>
                      setOpenedMenu((prev) => {
                        if (prev.includes(categoryName)) {
                          return prev.filter((c) => c !== categoryName);
                        } else {
                          return [...prev, categoryName];
                        }
                      })
                    }
                  >
                    <Icon />
                    <span
                      className={clsx({
                        [classes.mainMenuTitle]: true,
                        [classes.mainMenuTitleActive]: categoryActive,
                      })}
                    >
                      {categoryLabel}
                    </span>
                    <ArrowDown
                      className={classes.mainMenuArrow}
                      style={{
                        transform: isExpand ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                  <div
                    className={classes.menuContainer}
                    style={isExpand ? { maxHeight: 1000 } : {}}
                  >
                    {menu.map(({ menuLabel, menuName, path, pathDetail }) => {
                      const active =
                        location.includes(path) ||
                        location.includes(pathDetail);

                      return (
                        <Link
                          className={clsx({
                            [classes.menu]: true,
                            [classes.menuActive]: active && expand,
                          })}
                          id={`menu-${maskLocatorLabel(menuName)}`}
                          key={path}
                          href={path}
                        >
                          {menuLabel}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            },
          )}
        </div>
      )}
      {expand &&
        !!privileges?.find(({ category }) => category === 'DASHBOARD_ROLE') && (
          <div
            style={{
              position: 'sticky',
              bottom: 0,
              background: color.white,
              padding: '24px 16px 24px 16px',
            }}
          >
            <div className={classes.newDashboardContainer}>
              <div className={classes.newDashboard}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <Typography variant="subtitle1" weight="bold" inline>
                    Dashboard v5
                  </Typography>
                  <Typography variant="caption">
                    Discover new experience with myCarrier v5&apos;s latest
                    look.
                  </Typography>
                </div>
                <div>
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => {
                      window.location.href = '/dashboard';
                    }}
                  >
                    VIEW DASHBOARD
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );

  return (
    <>
      {smClient ? (
        <>
          <Drawer
            anchor="left"
            BackdropProps={{ invisible: true }}
            classes={{ paper: classes.drawer }}
            onClose={setExpand}
            open={expand}
          >
            {renderNav}
            <div className={classes.closeIcon}>
              <button className={classes.icon} onClick={setExpand}>
                <Cancel className="icon" />
              </button>
            </div>
          </Drawer>
        </>
      ) : (
        <>{renderNav}</>
      )}
    </>
  );
};

export default Navigation;
