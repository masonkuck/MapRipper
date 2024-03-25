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
}
