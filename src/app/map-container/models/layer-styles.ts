export abstract class LayerStyles {
    public static readonly waterLayerStyle: google.maps.MapTypeStyle[] =
        [
            {
                elementType: "geometry",
                stylers: [
                    {
                        color: "#ffffff"
                    }
                ]
            },
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#ffffff"
                    }
                ]
            },
            {
                featureType: "all",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        gamma: 0.01
                    },
                    {
                        lightness: 20
                    }
                ]
            },
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [
                    {
                        saturation: -31
                    },
                    {
                        lightness: -33
                    },
                    {
                        weight: 2
                    },
                    {
                        gamma: 0.8
                    }
                ]
            },
            {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "administrative",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                    {
                        lightness: 30
                    },
                    {
                        saturation: 30
                    }
                ]
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                    {
                        saturation: 20
                    }
                ]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                    {
                        lightness: 20
                    },
                    {
                        saturation: -20
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    {
                        lightness: 10
                    },
                    {
                        saturation: -30
                    },
                    {
                        color: "#030303"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                    {
                        color: "#030303"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [
                    {
                        saturation: 25
                    },
                    {
                        lightness: 25
                    },
                    {
                        color: "#030303"
                    }
                ]
            },
            {
                featureType: "transit",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "all",
                stylers: [
                    {
                        lightness: -20
                    },
                    {
                        visibility: "on"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#030303"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            }
        ];

    public static readonly roadsLayerStyle: google.maps.MapTypeStyle[] = [
        {
            featureType: "all",
            elementType: "geometry",
            stylers: [
                {
                    color: "#ffffff"
                }
            ]
        },
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [
                {
                    gamma: 0.01
                },
                {
                    lightness: 20
                }
            ]
        },
        {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
                {
                    saturation: -31
                },
                {
                    lightness: -33
                },
                {
                    weight: 2
                },
                {
                    gamma: 0.8
                }
            ]
        },
        {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "administrative",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "landscape",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
                {
                    lightness: 30
                },
                {
                    saturation: 30
                }
            ]
        },
        {
            featureType: "poi",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
                {
                    saturation: 20
                }
            ]
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
                {
                    lightness: 20
                },
                {
                    saturation: -20
                }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    lightness: 10
                },
                {
                    saturation: -30
                },
                {
                    color: "#030303"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#030303"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
                {
                    saturation: 25
                },
                {
                    lightness: 25
                },
                {
                    color: "#030303"
                }
            ]
        },
        {
            featureType: "transit",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "water",
            elementType: "all",
            stylers: [
                {
                    lightness: -20
                },
                {
                    visibility: "off"
                }
            ]
        }
    ];

    public static readonly parksLayerStyle: google.maps.MapTypeStyle[] = [
        {
            featureType: "administrative",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#444444"
                }
            ]
        },
        {
            featureType: "landscape",
            elementType: "all",
            stylers: [
                {
                    color: "#f2f2f2"
                },
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "landscape",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "landscape.man_made",
            elementType: "all",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    hue: "#00a7ff"
                }
            ]
        },
        {
            featureType: "landscape.natural",
            elementType: "all",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    hue: "#001cff"
                }
            ]
        },
        {
            featureType: "poi",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.park",
            elementType: "all",
            stylers: [
                {
                    visibility: "on"
                },
                {
                    color: "#000000"
                }
            ]
        },
        {
            featureType: "poi.park",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "all",
            stylers: [
                {
                    saturation: -100
                },
                {
                    lightness: 45
                },
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "road",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "transit",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "water",
            elementType: "all",
            stylers: [
                {
                    color: "#59b2d6"
                },
                {
                    visibility: "off"
                }
            ]
        }
    ]
}
