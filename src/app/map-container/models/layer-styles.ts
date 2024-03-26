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
            featureType: "poi",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.government",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.medical",
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
                },
                {
                    color: "#f6ebeb"
                }
            ]
        },
        {
            featureType: "poi.park",
            elementType: "labels.icon",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.place_of_worship",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.school",
            elementType: "all",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.sports_complex",
            elementType: "all",
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
                    visibility: "off"
                }
            ]
        }
    ]

    public static readonly transitLayerStyle: google.maps.MapTypeStyle[] = [
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
                    visibility: "on"
                }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
                {
                    color: "#030303"
                }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                {
                    visibility: "on"
                }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "transit",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
                {
                    // @ts-ignore
                    weight: "1.5"
                },
                {
                    invert_lightness: true
                },
                {
                    // @ts-ignore
                    gamma: "0.00"
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
