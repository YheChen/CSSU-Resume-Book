"use client"

import { useState } from "react"
import { SponsorLayout } from "../../../components/sponsor-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, User } from "lucide-react"
import { mockStudentProfiles } from "../../../lib/mock-data"

export default function SponsorDashboard() {
  const [students] = useState(mockStudentProfiles)
  const [filteredStudents, setFilteredStudents] = useState(mockStudentProfiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [programFilter, setProgramFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")

  // Handle search and filtering
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, programFilter, yearFilter)
  }

  const handleProgramFilter = (program: string) => {
    setProgramFilter(program)
    applyFilters(searchTerm, program, yearFilter)
  }

  const handleYearFilter = (year: string) => {
    setYearFilter(year)
    applyFilters(searchTerm, programFilter, year)
  }

  const applyFilters = (search: string, program: string, year: string) => {
    let result = students

    if (search) {
      const term = search.toLowerCase()
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term) ||
          student.program.toLowerCase().includes(term),
      )
    }

    if (program && program !== "all") {
      result = result.filter((student) => student.program === program)
    }

    if (year && year !== "all") {
      result = result.filter((student) => student.year === year)
    }

    setFilteredStudents(result)
  }

  // Get unique programs for filter
  const uniquePrograms = [...new Set(students.map((student) => student.program))].sort()

  return (
    <SponsorLayout>
      <h1 className="text-2xl font-bold mb-6">Student Resumes</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
          <CardDescription>Find students based on program, year, or search by name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or email"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="program-filter" className="text-sm font-medium">
                Program
              </label>
              <Select value={programFilter} onValueChange={handleProgramFilter}>
                <SelectTrigger id="program-filter">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {uniquePrograms.map((program) => (
                    <SelectItem key={program} value={program}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="year-filter" className="text-sm font-medium">
                Year of Study
              </label>
              <Select value={yearFilter} onValueChange={handleYearFilter}>
                <SelectTrigger id="year-filter">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                  <SelectItem value="5+">5+ Year</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </div>

      <div className="space-y-4">
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No students match your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="mr-2 h-5 w-5 text-muted-foreground" />
                      {student.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {student.program} •{" "}
                      {student.year === "1"
                        ? "1st"
                        : student.year === "2"
                          ? "2nd"
                          : student.year === "3"
                            ? "3rd"
                            : student.year === "4"
                              ? "4th"
                              : student.year}{" "}
                      Year
                    </p>
                    <p className="text-sm">{student.email}</p>
                  </div>
                  <Button asChild>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        console.log(`Downloading resume for ${student.name}`)
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </SponsorLayout>
  )
}
