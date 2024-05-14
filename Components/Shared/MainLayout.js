"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { UploadOutlined, CloseCircleOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Select } from 'antd';
const { Header, Content, Sider } = Layout;
import Router from 'next/router';
import {useDispatch} from "react-redux"
import {options} from "@/constants/data";
import { addCompany } from '@/redux/reducer/companySlice';
import {useSelector} from "react-redux"

const App = ({ children }) => {
  const dispatch = useDispatch();
  const { token: { colorBgContainer } } = theme.useToken();
  const [company, setCompany] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const companyId = useSelector(state=>state.value);

  const items = [
    {
      key: 1,
      icon: <UploadOutlined />,
      label: `Latest Releases`,
    },
    {
      key: 2,
      icon: <FileDoneOutlined />,
      label: `Amends Reports`,
    },
    {
      key: 3,
      icon: <CloseCircleOutlined />,
      label: `Failed Reports`,
    },
  ];

  const handleCompanyChange = (value) => {
    dispatch(addCompany(value))
    setCompany(value)
  };
  
  return (
    <Layout>
      <Sider
        style={{ height: '100vh' }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <div className='p-4 mb-2' style={{ height: 83 }}>
          <img src={`/images/${companyId}.png`} width={150} alt={`Company Logo - ${companyId}`} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onSelect={(e) => {
            if (e.key === '1') {
              Router.push("/latestReleases");
            } else if (e.key === '2') {
              Router.push("/amends");
            } else if (e.key === '3') {
              Router.push("/failedReports");
            }
          }}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='px-4'>
            <Select
              style={{ width: 155, opacity: 0.7 }}
              value={company}
              onChange={handleCompanyChange}
              options={options}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          {!isLoading && <div
            style={{
              padding: 24,
              minHeight: "88vh",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
