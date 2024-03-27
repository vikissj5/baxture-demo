'use client';

import { Box, Button, Card, Text, Avatar, Tooltip, Anchor, Flex } from "@mantine/core";
import { IconAt, IconPhoneCall, IconWorld, IconTrash, IconUserPlus, IconUserMinus, IconStar } from '@tabler/icons-react';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { getAvatar } from "../api";


type CardsProps = {
    title: string;
    email: string;
    domain: string;
    phone: string;
    id: number;
    deleteAction: (id: number) => void;
}

const Cards = ({ title, email, domain, phone, id, deleteAction }: CardsProps) => {
    const [isFollwing, setIsFollowing] = useState(false);
    const [avatars, setAvatars] = useState<string>();

    useEffect(() => {
        async function getAvatarFor() {
            const avatarName = await getAvatar(title);
            setAvatars(avatarName);
        }
        getAvatarFor();
    }, [])

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (e: any) => {
        deleteAction(id);
    }

    const handleToggle: MouseEventHandler<HTMLButtonElement> = (e: any) => {
        setIsFollowing(!isFollwing);
    }

    const iconStyle = {
        width: '16px',
        height: '16px',
        marginTop: '5px',
        marginRight: '3px',
        color: 'rgb(134, 142, 150)'
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {/* Render your card content here using props */}
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Tooltip label={title} withArrow>
                    <Anchor href={`https://www.${domain}`} target="_blank"><Avatar src={`data:image/svg+xml,${encodeURIComponent(avatars ?? "")}`} alt="avatar" size={"125"} ta={'center'} /></Anchor>
                </Tooltip>

                <Text size='lg' style={{
                    marginTop: "16px",
                    fontWeight: '600'
                }}>{title}{isFollwing && <IconStar style={{
                    width: '16px',
                    height: '16px',
                    marginTop: '5px',
                    marginLeft: '6px',
                    color: 'rgb(0, 0, 0)'
                }} />}</Text>
            </Box>
            <Box mb={'5'}><IconAt style={iconStyle} /><Anchor href={`mailto:${email}`} underline="hover" c="dimmed">{email}</Anchor></Box>
            <Box mb={'5'}><IconPhoneCall style={iconStyle} /><Anchor href={`tel:${phone}`} underline="hover" c="dimmed" >{phone}</Anchor></Box>
            <Box mb={'5'}><IconWorld style={iconStyle} /><Anchor href={`https://www.${domain}`} target="_blank" underline="hover" c="dimmed">{domain}</Anchor></Box>

            <Flex gap={'3'} mt={'10'}>
                {!isFollwing ? <Button variant="filled" onClick={handleToggle} style={{
                    flexGrow: '1'
                }}><IconUserPlus height={'16px'} width={'16px'} style={{
                    marginRight: '8px'
                }} /> Follow</Button> :
                    <Button variant="outline" onClick={handleToggle} color="black" style={{
                        flexGrow: '1'
                    }}><IconUserMinus height={'16px'} width={'16px'} style={{
                        marginRight: '8px'
                    }} /> Unfollow</Button>}

                <Button variant="outline" onClick={handleDelete} style={{
                    flexGrow: '1'
                }}><IconTrash height={'16px'} width={'16px'} style={{
                    marginRight: '8px'
                }} />Delete</Button>
            </Flex>

        </Card >
    );
}

export default Cards;
