#!/bin/bash
# ============================================================
# CamPhish URL Shortener
# ============================================================
# Author: Rahul Kushwaha
# GitHub: https://github.com/raahulllkushwaha
# Repository: https://github.com/raahulllkushwaha/Cam-Phisher
# License: GNU General Public License v3.0
# 
# Description: URL shortening utility for CamPhish using
# various URL shortener APIs (is.gd, v.gd, TinyURL)
# ============================================================

# Colors for output
RED='\033[1;31m'
GREEN='\033[1;92m'
YELLOW='\033[1;93m'
BLUE='\033[1;94m'
CYAN='\033[1;96m'
WHITE='\033[1;97m'
NC='\033[0m' # No Color

# Banner
banner() {
    clear
    echo -e "${GREEN}"
    echo "   ██╗   ██╗██████╗ ██╗         ███████╗██╗  ██╗ ██████╗ ██████╗ ████████╗███████╗███╗   ██╗███████╗██████╗ "
    echo "   ██║   ██║██╔══██╗██║         ██╔════╝██║  ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝████╗  ██║██╔════╝██╔══██╗"
    echo "   ██║   ██║██████╔╝██║         ███████╗███████║██║   ██║██████╔╝   ██║   █████╗  ██╔██╗ ██║█████╗  ██████╔╝"
    echo "   ██║   ██║██╔══██╗██║         ╚════██║██╔══██║██║   ██║██╔══██╗   ██║   ██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗"
    echo "   ╚██████╔╝██║  ██║███████╗    ███████║██║  ██║╚██████╔╝██║  ██║   ██║   ███████╗██║ ╚████║███████╗██║  ██║"
    echo "    ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝"
    echo -e "${NC}"
    echo -e "${WHITE}   CamPhish URL Shortener${NC}"
    echo -e "${CYAN}   Author: Rahul Kushwaha | https://github.com/raahulllkushwaha${NC}"
    echo ""
}

# Check dependencies
check_dependencies() {
    command -v curl > /dev/null 2>&1 || { 
        echo -e "${RED}[!] curl is required but not installed. Please install it.${NC}"
        exit 1
    }
}

# Shorten URL using is.gd
shorten_isgd() {
    local url="$1"
    local result=$(curl -s "https://is.gd/create.php?format=simple&url=${url}")
    
    if [[ "$result" == "https://is.gd/"* ]]; then
        echo -e "${GREEN}[✓] is.gd shortened URL:${NC} ${WHITE}$result${NC}"
        shortened_url="$result"
        return 0
    else
        echo -e "${RED}[✗] is.gd shortening failed${NC}"
        return 1
    fi
}

# Shorten URL using v.gd
shorten_vgd() {
    local url="$1"
    local result=$(curl -s "https://v.gd/create.php?format=simple&url=${url}")
    
    if [[ "$result" == "https://v.gd/"* ]]; then
        echo -e "${GREEN}[✓] v.gd shortened URL:${NC} ${WHITE}$result${NC}"
        shortened_url="$result"
        return 0
    else
        echo -e "${RED}[✗] v.gd shortening failed${NC}"
        return 1
    fi
}

# Shorten URL using TinyURL
shorten_tinyurl() {
    local url="$1"
    local result=$(curl -s "https://tinyurl.com/api-create.php?url=${url}")
    
    if [[ "$result" == "https://tinyurl.com/"* ]]; then
        echo -e "${GREEN}[✓] TinyURL shortened URL:${NC} ${WHITE}$result${NC}"
        shortened_url="$result"
        return 0
    else
        echo -e "${RED}[✗] TinyURL shortening failed${NC}"
        return 1
    fi
}

# Shorten URL using all services
shorten_all() {
    local url="$1"
    echo ""
    echo -e "${YELLOW}[*] Shortening URL with all available services...${NC}"
    echo ""
    shorten_isgd "$url"
    shorten_vgd "$url"
    shorten_tinyurl "$url"
    echo ""
}

# Validate URL format
validate_url() {
    local url="$1"
    if [[ "$url" =~ ^https?:// ]]; then
        return 0
    else
        echo -e "${RED}[!] Invalid URL format. URL must start with http:// or https://${NC}"
        return 1
    fi
}

# Main menu
main_menu() {
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━ Select URL Shortener Service ━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}[${WHITE}01${GREEN}]${NC} ${WHITE}is.gd${NC}"
    echo -e "${GREEN}[${WHITE}02${GREEN}]${NC} ${WHITE}v.gd${NC}"
    echo -e "${GREEN}[${WHITE}03${GREEN}]${NC} ${WHITE}TinyURL${NC}"
    echo -e "${GREEN}[${WHITE}04${GREEN}]${NC} ${WHITE}All Services${NC}"
    echo -e "${GREEN}[${WHITE}05${GREEN}]${NC} ${WHITE}Exit${NC}"
    echo ""
    read -p $'\e[1;92m[\e[0m\e[1;77m+\e[0m\e[1;92m] Select an option: \e[0m' choice
    
    case $choice in
        1)
            read -p $'\e[1;92m[\e[0m\e[1;77m+\e[0m\e[1;92m] Enter URL to shorten: \e[0m' url
            if validate_url "$url"; then
                echo ""
                shorten_isgd "$url"
            fi
            ;;
        2)
            read -p $'\e[1;92m[\e[0m\e[1;77m+\e[0m\e[1;92m] Enter URL to shorten: \e[0m' url
            if validate_url "$url"; then
                echo ""
                shorten_vgd "$url"
            fi
            ;;
        3)
            read -p $'\e[1;92m[\e[0m\e[1;77m+\e[0m\e[1;92m] Enter URL to shorten: \e[0m' url
            if validate_url "$url"; then
                echo ""
                shorten_tinyurl "$url"
            fi
            ;;
        4)
            read -p $'\e[1;92m[\e[0m\e[1;77m+\e[0m\e[1;92m] Enter URL to shorten: \e[0m' url
            if validate_url "$url"; then
                shorten_all "$url"
            fi
            ;;
        5)
            echo -e "${GREEN}[*] Exiting...${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}[!] Invalid option!${NC}"
            ;;
    esac
    
    echo ""
    read -p $'\e[1;92m[\e[0m\e[1;77m+\e[0m\e[1;92m] Press Enter to continue...\e[0m'
    banner
    main_menu
}

# Command line mode
cli_mode() {
    local service="$1"
    local url="$2"
    
    if ! validate_url "$url"; then
        exit 1
    fi
    
    case $service in
        --isgd|-i)
            shorten_isgd "$url"
            ;;
        --vgd|-v)
            shorten_vgd "$url"
            ;;
        --tinyurl|-t)
            shorten_tinyurl "$url"
            ;;
        --all|-a)
            shorten_all "$url"
            ;;
        *)
            echo -e "${RED}[!] Unknown service: $service${NC}"
            show_usage
            exit 1
            ;;
    esac
}

# Show usage information
show_usage() {
    echo ""
    echo -e "${WHITE}Usage:${NC}"
    echo "  $0                    - Interactive mode"
    echo "  $0 <service> <url>    - Command line mode"
    echo ""
    echo -e "${WHITE}Services:${NC}"
    echo "  --isgd, -i      Use is.gd"
    echo "  --vgd, -v       Use v.gd"
    echo "  --tinyurl, -t   Use TinyURL"
    echo "  --all, -a       Use all services"
    echo ""
    echo -e "${WHITE}Examples:${NC}"
    echo "  $0 --isgd https://example.com"
    echo "  $0 -t https://google.com"
    echo "  $0 --all https://github.com"
    echo ""
}

# Main entry point
main() {
    check_dependencies
    
    if [[ $# -eq 0 ]]; then
        # Interactive mode
        banner
        main_menu
    elif [[ $# -eq 1 ]] && [[ "$1" == "--help" || "$1" == "-h" ]]; then
        banner
        show_usage
    elif [[ $# -eq 2 ]]; then
        # Command line mode
        cli_mode "$1" "$2"
    else
        banner
        show_usage
        exit 1
    fi
}

# Run main function
main "$@"
